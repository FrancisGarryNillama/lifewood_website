import base64
import hashlib
import hmac
import secrets

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import models
from django.urls import reverse


def _build_keystream(nonce: bytes, length: int) -> bytes:
    key = settings.SECRET_KEY.encode("utf-8")
    blocks = []
    counter = 0

    while sum(len(block) for block in blocks) < length:
        counter_bytes = counter.to_bytes(4, "big")
        blocks.append(hmac.new(key, nonce + counter_bytes, hashlib.sha256).digest())
        counter += 1

    return b"".join(blocks)[:length]


def _encrypt_value(value: str) -> str:
    raw = value.encode("utf-8")
    nonce = secrets.token_bytes(16)
    keystream = _build_keystream(nonce, len(raw))
    cipher = bytes(char ^ mask for char, mask in zip(raw, keystream))
    return base64.urlsafe_b64encode(nonce + cipher).decode("utf-8")


def _decrypt_value(value: str) -> str:
    payload = base64.urlsafe_b64decode(value.encode("utf-8"))
    nonce, cipher = payload[:16], payload[16:]
    keystream = _build_keystream(nonce, len(cipher))
    plain = bytes(char ^ mask for char, mask in zip(cipher, keystream))
    return plain.decode("utf-8")


class EncryptedTextField(models.TextField):
    """Encrypt values at rest while keeping plain strings in Python."""

    def from_db_value(self, value, expression, connection):
        return self.to_python(value)

    def to_python(self, value):
        if value in (None, "") or not isinstance(value, str):
            return value

        try:
            return _decrypt_value(value)
        except (ValueError, TypeError, UnicodeDecodeError):
            return value

    def get_prep_value(self, value):
        value = super().get_prep_value(value)
        if value in (None, ""):
            return value
        return _encrypt_value(str(value))


class EncryptedEmailField(EncryptedTextField):
    def validate(self, value, model_instance):
        super().validate(value, model_instance)
        if value:
            try:
                validate_email(value)
            except ValidationError as exc:
                raise ValidationError("Enter a valid email address.") from exc


class Applicant(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"
        INTERVIEW_SCHEDULED = "interview_scheduled", "Interview Scheduled"

    class EmailType(models.TextChoices):
        NONE = "", "None"
        APPROVAL = "approval", "Approval"
        REJECTION = "rejection", "Rejection"
        INTERVIEW = "interview", "Interview"

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    # Inquiry-focused fields.
    work_email = EncryptedEmailField(blank=True)
    company = models.CharField(max_length=200, blank=True)
    phone_number = EncryptedTextField(blank=True)
    inquiry_type = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)

    # Legacy careers fields kept so existing flows keep working.
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    position = models.CharField(max_length=200, blank=True)
    department = models.CharField(max_length=100, blank=True)
    cover_letter = models.TextField(blank=True)
    cv_url = models.CharField(max_length=500, blank=True)
    status = models.CharField(
        max_length=32,
        choices=Status.choices,
        default=Status.PENDING,
    )
    interview_date = models.DateTimeField(blank=True, null=True)
    email_sent_at = models.DateTimeField(blank=True, null=True)
    last_email_type = models.CharField(max_length=32, choices=EmailType.choices, blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        label = self.inquiry_type or self.position or "Inquiry"
        return f"{self.first_name} {self.last_name} - {label}"

    def get_cv_download_path(self) -> str:
        return reverse("applicants:download_cv", args=[self.pk])
