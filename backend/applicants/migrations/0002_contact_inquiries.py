from django.db import migrations, models

import applicants.models


class Migration(migrations.Migration):

    dependencies = [
        ("applicants", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="company",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="applicant",
            name="inquiry_type",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="applicant",
            name="message",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="applicant",
            name="phone_number",
            field=applicants.models.EncryptedTextField(blank=True),
        ),
        migrations.AddField(
            model_name="applicant",
            name="work_email",
            field=applicants.models.EncryptedEmailField(blank=True),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="department",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="email",
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="phone",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="position",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
