from django.contrib import admin
from django.utils.html import format_html

from .models import Applicant


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "inquiry_type", "status", "company", "submitted_at")
    search_fields = ("first_name", "last_name", "company", "inquiry_type", "email")
    list_filter = ("inquiry_type", "status", "submitted_at")
    readonly_fields = ("submitted_at", "cv_download_link", "email_sent_at", "last_email_type")
    fields = (
        "first_name",
        "last_name",
        "work_email",
        "email",
        "phone_number",
        "phone",
        "inquiry_type",
        "company",
        "position",
        "department",
        "message",
        "cover_letter",
        "cv_download_link",
        "status",
        "interview_date",
        "email_sent_at",
        "last_email_type",
        "submitted_at",
    )

    def cv_download_link(self, obj: Applicant):
        if not obj.pk or not obj.cv_url:
            return "No CV uploaded"
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">Download CV</a>',
            obj.get_cv_download_path(),
        )

    cv_download_link.short_description = "Attached CV"
