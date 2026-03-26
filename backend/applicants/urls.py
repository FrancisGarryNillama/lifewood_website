from django.urls import path
from . import views

app_name = "applicants"

urlpatterns = [
    path("auth/csrf/", views.csrf_token, name="csrf_token"),
    path("applicants/submit/", views.submit_applicant, name="submit"),
    path("applicants/",        views.list_applicants,  name="list"),
    path("auth/status/",       views.auth_status,      name="auth_status"),
]
