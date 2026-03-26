import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import Applicant


def _json_body(request) -> dict:
    try:
        return json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return {}


def _require_admin(request):
    """Return a JsonResponse error if the request is not from an authenticated staff user."""
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"detail": "Unauthorized."}, status=401)
    return None


# ── POST /api/applicants/submit/ ─────────────────────────────────────────────
# Public endpoint – anyone can submit an application.

@csrf_exempt
@require_POST
def submit_applicant(request):
    data = _json_body(request)

    required = ["firstName", "lastName", "email", "position"]
    missing  = [f for f in required if not data.get(f, "").strip()]
    if missing:
        return JsonResponse(
            {"detail": f"Missing required fields: {', '.join(missing)}"},
            status=400,
        )

    applicant = Applicant.objects.create(
        first_name   = data["firstName"].strip(),
        last_name    = data["lastName"].strip(),
        email        = data["email"].strip().lower(),
        phone        = data.get("phone", "").strip(),
        position     = data["position"].strip(),
        department   = data.get("department", "").strip(),
        cover_letter = data.get("coverLetter", "").strip(),
    )

    return JsonResponse(
        {
            "message": "Application submitted successfully.",
            "id": applicant.id,
        },
        status=201,
    )


# ── GET /api/applicants/ ─────────────────────────────────────────────────────
# Admin-only endpoint – returns all applicants as JSON.

@csrf_exempt
@require_GET
def list_applicants(request):
    error = _require_admin(request)
    if error:
        return error

    applicants = list(
        Applicant.objects.values(
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "position",
            "department",
            "cover_letter",
            "submitted_at",
        )
    )

    # Serialize datetime to ISO string
    for a in applicants:
        a["submitted_at"] = a["submitted_at"].isoformat()

    return JsonResponse({"applicants": applicants}, status=200)


# ── GET /api/auth/status/ ────────────────────────────────────────────────────
# Lets the frontend check whether the current session belongs to a staff user.

@require_GET
def auth_status(request):
    if request.user.is_authenticated and request.user.is_staff:
        return JsonResponse(
            {"authenticated": True, "username": request.user.username},
            status=200,
        )
    return JsonResponse({"authenticated": False}, status=200)