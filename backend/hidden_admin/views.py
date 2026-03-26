import json
import logging

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)

# The secret that the frontend must present before the login form is shown.
# This must match HIDDEN_ADMIN_SECRET in frontend/app/pages/HomePage.tsx.
_UNLOCK_SECRET = "paenggwapo123"

# Session key used to mark that the unlock step has been completed.
_SESSION_UNLOCKED = "hidden_admin_unlocked"


def _json_body(request) -> dict:
    """Parse JSON body; return empty dict on failure."""
    try:
        return json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return {}


# ── /hidden-admin/unlock/ ─────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def unlock(request):
    """
    Step 1 – The frontend sends the secret key sequence here.
    If it matches, we mark the session as "unlocked" so the login
    endpoint becomes available.  No credentials are involved yet.
    """
    data = _json_body(request)
    secret = data.get("secret", "")

    if secret != _UNLOCK_SECRET:
        return JsonResponse(
            {"detail": "Invalid secret."},
            status=403,
        )

    request.session[_SESSION_UNLOCKED] = True
    request.session.modified = True

    return JsonResponse(
        {"message": "Access unlocked. Enter your administrator credentials."},
        status=200,
    )


# ── /hidden-admin/login/ ──────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def hidden_login(request):
    """
    Step 2 – Only reachable after a successful /unlock/ call in the same
    session.  Validates Django credentials and opens a session on success.
    """
    if not request.session.get(_SESSION_UNLOCKED):
        return JsonResponse(
            {"detail": "Unauthorized. Complete the unlock step first."},
            status=403,
        )

    data = _json_body(request)
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return JsonResponse(
            {"detail": "Username and password are required."},
            status=400,
        )

    user = authenticate(request, username=username, password=password)

    if user is None:
        logger.warning("Hidden admin: failed login attempt for username=%r", username)
        return JsonResponse(
            {"detail": "Invalid credentials."},
            status=401,
        )

    if not user.is_staff:
        return JsonResponse(
            {"detail": "Access denied. Staff account required."},
            status=403,
        )

    login(request, user)

    return JsonResponse(
        {"message": f"Welcome, {user.username}. You are now signed in."},
        status=200,
    )


# ── /hidden-admin/logout/ ─────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def hidden_logout(request):
    """
    Ends the hidden admin session and clears the unlock flag.
    Safe to call even when not authenticated.
    """
    logout(request)
    request.session.pop(_SESSION_UNLOCKED, None)

    return JsonResponse(
        {"message": "Session ended."},
        status=200,
    )