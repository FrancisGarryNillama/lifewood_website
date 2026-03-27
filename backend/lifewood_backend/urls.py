from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    # Django's built-in admin panel (still useful for superusers who know
    # the URL; can be renamed or removed for extra security in production).
    path('admin/', admin.site.urls),

    # Hidden admin authentication (unlock → login → logout)
    path('hidden-admin/', include('hidden_admin.urls', namespace='hidden_admin')),

    # Public applicant submission + admin list + auth status
    path('api/', include('applicants.urls', namespace='applicants')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
