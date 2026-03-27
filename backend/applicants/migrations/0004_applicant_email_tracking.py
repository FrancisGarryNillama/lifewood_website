from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("applicants", "0003_applicant_cv_status_interview"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="email_sent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="applicant",
            name="last_email_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("", "None"),
                    ("approval", "Approval"),
                    ("rejection", "Rejection"),
                    ("interview", "Interview"),
                ],
                max_length=32,
            ),
        ),
    ]
