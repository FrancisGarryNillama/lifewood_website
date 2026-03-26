from django.db import models

class Applicant(models.Model):
    first_name   = models.CharField(max_length=100)
    last_name    = models.CharField(max_length=100)
    email        = models.EmailField()
    phone        = models.CharField(max_length=50, blank=True)
    position     = models.CharField(max_length=200)
    department   = models.CharField(max_length=100, blank=True)
    cover_letter = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} – {self.position}"