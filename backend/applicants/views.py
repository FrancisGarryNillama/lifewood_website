import json
import logging
import os
import uuid

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.mail import EmailMultiAlternatives
from django.http import FileResponse, JsonResponse
from django.middleware.csrf import get_token
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST

from .models import Applicant

logger = logging.getLogger(__name__)

ALLOWED_CV_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_CV_CONTENT_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
MAX_CV_SIZE_BYTES = 5 * 1024 * 1024


def _json_body(request) -> dict:
    try:
        return json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return {}


def _require_admin(request):
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"detail": "Unauthorized."}, status=401)
    return None


def _clean(data: dict, key: str) -> str:
    return str(data.get(key, "")).strip()


def _request_data(request) -> dict:
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        return request.POST
    return _json_body(request)


def _missing_required(data: dict, required: list[str]) -> list[str]:
    return [field for field in required if not _clean(data, field)]


def _save_cv(upload) -> str:
    extension = os.path.splitext(upload.name)[1].lower()
    if extension not in ALLOWED_CV_EXTENSIONS:
        raise ValueError("Attach CV must be a PDF, DOC, or DOCX file.")

    content_type = getattr(upload, "content_type", "")
    if content_type and content_type not in ALLOWED_CV_CONTENT_TYPES:
        raise ValueError("Unsupported CV file type.")

    if upload.size > MAX_CV_SIZE_BYTES:
        raise ValueError("Attach CV must be 5 MB or smaller.")

    safe_name = f"cv_uploads/{uuid.uuid4().hex}{extension}"
    return default_storage.save(safe_name, upload)


def _position_label(applicant: Applicant) -> str:
    return applicant.position or "Applicant"


def _email_context(applicant: Applicant) -> dict:
    interview_date = None
    interview_display = None
    timezone_name = timezone.get_current_timezone_name()
    if applicant.interview_date:
        interview_date = timezone.localtime(applicant.interview_date)
        interview_display = interview_date.strftime("%B %d, %Y at %I:%M %p")
        timezone_name = interview_date.tzname() or timezone_name

    return {
        "applicant": applicant,
        "position": _position_label(applicant),
        "interview_date": interview_date,
        "interview_display": interview_display or "To be confirmed",
        "timezone_name": timezone_name,
    }


def _send_applicant_email(applicant: Applicant, email_type: str) -> None:
    recipient = applicant.email or applicant.work_email
    if not recipient:
        raise ValueError("Applicant email address is missing.")

    templates = {
        Applicant.EmailType.APPROVAL: {
            "subject": f"Lifewood Application Update - Approved for {_position_label(applicant)}",
            "html": "applicants/emails/approval_email.html",
            "text": "applicants/emails/approval_email.txt",
        },
        Applicant.EmailType.REJECTION: {
            "subject": f"Lifewood Application Update - Rejected for {_position_label(applicant)}",
            "html": "applicants/emails/rejection_email.html",
            "text": "applicants/emails/rejection_email.txt",
        },
        Applicant.EmailType.INTERVIEW: {
            "subject": f"Lifewood Interview Schedule - {_position_label(applicant)}",
            "html": "applicants/emails/interview_email.html",
            "text": "applicants/emails/interview_email.txt",
        },
    }
    config = templates.get(email_type)
    if not config:
        raise ValueError("Unsupported email type.")

    context = _email_context(applicant)
    text_body = render_to_string(config["text"], context)
    html_body = render_to_string(config["html"], context)

    message = EmailMultiAlternatives(
        subject=config["subject"],
        body=text_body,
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "Lifewood HR <hr@lifewood.local>"),
        to=[recipient],
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)

    applicant.email_sent_at = timezone.now()
    applicant.last_email_type = email_type


def _save_status_and_email(applicant: Applicant, *, status_value: str, email_type: str, clear_interview: bool) -> None:
    applicant.status = status_value
    if clear_interview:
        applicant.interview_date = None

    _send_applicant_email(applicant, email_type)
    applicant.save(update_fields=["status", "interview_date", "email_sent_at", "last_email_type"])


def _serialize_applicant(applicant: Applicant) -> dict:
    inquiry_type = applicant.inquiry_type or ("Careers" if applicant.position else "General Inquiry")
    company = applicant.company or applicant.department

    return {
        "id": applicant.id,
        "first_name": applicant.first_name,
        "last_name": applicant.last_name,
        "work_email": applicant.work_email or applicant.email,
        "company": company,
        "phone_number": applicant.phone_number or applicant.phone,
        "inquiry_type": inquiry_type,
        "message": applicant.message or applicant.cover_letter,
        "submitted_at": applicant.submitted_at.isoformat(),
        "position": applicant.position,
        "department": applicant.department,
        "cv_url": applicant.cv_url,
        "cv_download_url": applicant.get_cv_download_path() if applicant.cv_url else "",
        "status": applicant.status,
        "interview_date": applicant.interview_date.isoformat() if applicant.interview_date else None,
        "email_sent_at": applicant.email_sent_at.isoformat() if applicant.email_sent_at else None,
        "last_email_type": applicant.last_email_type,
    }


@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)}, status=200)


@require_POST
@csrf_protect
def submit_applicant(request):
    data = _request_data(request)

    is_contact_inquiry = any(
        key in data for key in ("workEmail", "company", "phoneNumber", "inquiryType", "message")
    )

    if is_contact_inquiry:
        required = ["firstName", "lastName", "workEmail", "inquiryType", "message"]
        missing = _missing_required(data, required)
        if missing:
            return JsonResponse(
                {"detail": f"Missing required fields: {', '.join(missing)}"},
                status=400,
            )

        applicant = Applicant.objects.create(
            first_name=_clean(data, "firstName"),
            last_name=_clean(data, "lastName"),
            work_email=_clean(data, "workEmail").lower(),
            company=_clean(data, "company"),
            phone_number=_clean(data, "phoneNumber"),
            inquiry_type=_clean(data, "inquiryType"),
            message=_clean(data, "message"),
        )

        return JsonResponse(
            {
                "message": "Inquiry submitted successfully.",
                "id": applicant.id,
            },
            status=201,
        )

    required = ["firstName", "lastName", "email", "position"]
    missing = _missing_required(data, required)
    if missing:
        return JsonResponse(
            {"detail": f"Missing required fields: {', '.join(missing)}"},
            status=400,
        )

    upload = request.FILES.get("cv")
    if not upload:
        return JsonResponse({"detail": "Attach CV is required."}, status=400)

    try:
        cv_path = _save_cv(upload)
    except ValueError as exc:
        return JsonResponse({"detail": str(exc)}, status=400)

    applicant = Applicant.objects.create(
        first_name=_clean(data, "firstName"),
        last_name=_clean(data, "lastName"),
        work_email=_clean(data, "email").lower(),
        company=_clean(data, "company") or _clean(data, "department"),
        phone_number=_clean(data, "phone"),
        inquiry_type="Careers",
        message=_clean(data, "coverLetter"),
        email=_clean(data, "email").lower(),
        phone=_clean(data, "phone"),
        position=_clean(data, "position"),
        department=_clean(data, "department"),
        cover_letter=_clean(data, "coverLetter"),
        cv_url=cv_path,
        status=Applicant.Status.PENDING,
    )

    return JsonResponse(
        {
            "message": "Application submitted successfully.",
            "id": applicant.id,
            "status": applicant.status,
        },
        status=201,
    )


@require_GET
def list_applicants(request):
    error = _require_admin(request)
    if error:
        return error

    applicants = [_serialize_applicant(applicant) for applicant in Applicant.objects.all()]
    return JsonResponse({"applicants": applicants}, status=200)


@require_POST
@csrf_protect
def update_applicant_status(request, applicant_id: int):
    error = _require_admin(request)
    if error:
        return error

    data = _json_body(request)
    status_value = _clean(data, "status")
    valid_statuses = {
        Applicant.Status.APPROVED,
        Applicant.Status.REJECTED,
        Applicant.Status.PENDING,
        Applicant.Status.INTERVIEW_SCHEDULED,
    }
    if status_value not in valid_statuses:
        return JsonResponse({"detail": "Invalid applicant status."}, status=400)
    if status_value == Applicant.Status.INTERVIEW_SCHEDULED:
        return JsonResponse({"detail": "Use the interview scheduling action for interview notifications."}, status=400)

    applicant = get_object_or_404(Applicant, pk=applicant_id)
    email_type = {
        Applicant.Status.APPROVED: Applicant.EmailType.APPROVAL,
        Applicant.Status.REJECTED: Applicant.EmailType.REJECTION,
        Applicant.Status.PENDING: Applicant.EmailType.NONE,
    }[status_value]

    try:
        if email_type == Applicant.EmailType.NONE:
            applicant.status = status_value
            applicant.interview_date = None
            applicant.save(update_fields=["status", "interview_date"])
        else:
            _save_status_and_email(
                applicant,
                status_value=status_value,
                email_type=email_type,
                clear_interview=True,
            )
    except Exception:
        logger.exception("Failed to update applicant status and send email for applicant %s", applicant.pk)
        return JsonResponse({"detail": "Unable to send the applicant email right now."}, status=500)

    return JsonResponse({"applicant": _serialize_applicant(applicant)}, status=200)


@require_POST
@csrf_protect
def schedule_interview(request, applicant_id: int):
    error = _require_admin(request)
    if error:
        return error

    data = _json_body(request)
    raw_value = _clean(data, "interviewDate")
    if not raw_value:
        return JsonResponse({"detail": "Interview date is required."}, status=400)

    interview_date = parse_datetime(raw_value)
    if interview_date is None:
        return JsonResponse({"detail": "Interview date format is invalid."}, status=400)

    if timezone.is_naive(interview_date):
        interview_date = timezone.make_aware(interview_date, timezone.get_current_timezone())

    applicant = get_object_or_404(Applicant, pk=applicant_id)
    applicant.status = Applicant.Status.INTERVIEW_SCHEDULED
    applicant.interview_date = interview_date
    try:
        _save_status_and_email(
            applicant,
            status_value=Applicant.Status.INTERVIEW_SCHEDULED,
            email_type=Applicant.EmailType.INTERVIEW,
            clear_interview=False,
        )
    except Exception:
        logger.exception("Failed to schedule interview and send email for applicant %s", applicant.pk)
        return JsonResponse({"detail": "Unable to send the interview email right now."}, status=500)

    return JsonResponse({"applicant": _serialize_applicant(applicant)}, status=200)


@require_GET
def download_cv(request, applicant_id: int):
    error = _require_admin(request)
    if error:
        return error

    applicant = get_object_or_404(Applicant, pk=applicant_id)
    if not applicant.cv_url:
        return JsonResponse({"detail": "No CV uploaded for this applicant."}, status=404)

    cv_file = default_storage.open(applicant.cv_url, "rb")
    extension = os.path.splitext(applicant.cv_url)[1].lower()
    safe_first = applicant.first_name.strip().replace(" ", "_") or "applicant"
    safe_last = applicant.last_name.strip().replace(" ", "_") or "cv"
    filename = f"{safe_first}_{safe_last}_cv{extension}"
    return FileResponse(cv_file, as_attachment=True, filename=filename)


@require_GET
def auth_status(request):
    if request.user.is_authenticated and request.user.is_staff:
        return JsonResponse(
            {"authenticated": True, "username": request.user.username},
            status=200,
        )
    return JsonResponse({"authenticated": False}, status=200)
