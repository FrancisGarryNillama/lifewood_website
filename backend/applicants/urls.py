from django.urls import path
from . import views

app_name = "applicants"

urlpatterns = [
    path("auth/csrf/", views.csrf_token, name="csrf_token"),
    path("applicants/submit/", views.submit_applicant, name="submit"),
    path("applicants/",        views.list_applicants,  name="list"),
    path("applicants/<int:applicant_id>/status/", views.update_applicant_status, name="update_status"),
    path("applicants/<int:applicant_id>/schedule-interview/", views.schedule_interview, name="schedule_interview"),
    path("applicants/<int:applicant_id>/cv/", views.download_cv, name="download_cv"),
    path("auth/status/",       views.auth_status,      name="auth_status"),
]
