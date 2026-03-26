from django.contrib import admin

from .models import Applicant


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "inquiry_type", "company", "submitted_at")
    search_fields = ("first_name", "last_name", "company", "inquiry_type", "email")
    list_filter = ("inquiry_type", "submitted_at")
