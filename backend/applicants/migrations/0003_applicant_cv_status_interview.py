from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("applicants", "0002_contact_inquiries"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="cv_url",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="applicant",
            name="interview_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="applicant",
            name="status",
            field=models.CharField(
                choices=[
                    ("pending", "Pending"),
                    ("approved", "Approved"),
                    ("rejected", "Rejected"),
                    ("interview_scheduled", "Interview Scheduled"),
                ],
                default="pending",
                max_length=32,
            ),
        ),
    ]
