"""
HiddenAdminProtectionMiddleware
-------------------------------
Prevents direct access to /hidden-admin/login/ without first completing
the /hidden-admin/unlock/ handshake within the same session.

The /unlock/ and /logout/ endpoints are always reachable because:
  • /unlock/ is the entry point (no session needed yet).
  • /logout/ must be callable even when not authenticated.

Everything else under /hidden-admin/ requires the session flag.
"""

from django.http import JsonResponse

_PREFIX = "/hidden-admin/"
_ALWAYS_OPEN = {
    "/hidden-admin/unlock/",
    "/hidden-admin/logout/",
}
_SESSION_UNLOCKED = "hidden_admin_unlocked"


class HiddenAdminProtectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path

        if path.startswith(_PREFIX) and path not in _ALWAYS_OPEN:
            if not request.session.get(_SESSION_UNLOCKED):
                return JsonResponse(
                    {"detail": "Not found."},
                    status=404,
                )

        return self.get_response(request)