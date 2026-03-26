import json

from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST

from .models import Applicant


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


def _missing_required(data: dict, required: list[str]) -> list[str]:
    return [field for field in required if not _clean(data, field)]


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
    }


@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)}, status=200)


@require_POST
@csrf_protect
def submit_applicant(request):
    data = _json_body(request)

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
    )

    return JsonResponse(
        {
            "message": "Application submitted successfully.",
            "id": applicant.id,
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


@require_GET
def auth_status(request):
    if request.user.is_authenticated and request.user.is_staff:
        return JsonResponse(
            {"authenticated": True, "username": request.user.username},
            status=200,
        )
    return JsonResponse({"authenticated": False}, status=200)
