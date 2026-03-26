"""
Django settings for lifewood_backend project.
"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ── Security ──────────────────────────────────────────────────────────────────
SECRET_KEY = 'django-insecure-mz_i&rgrhb2efw04%hr&4l_n*7310y2(=^xkjp*-&at4)j-+r1'

DEBUG = True   # Set to False and configure properly before deploying to production.

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# ── Applications ──────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'corsheaders',

    # Local
    'hidden_admin.apps.HiddenAdminConfig',
    'applicants.apps.ApplicantsConfig',
]


# ── Middleware ────────────────────────────────────────────────────────────────
MIDDLEWARE = [
    # CORS must be first so preflight OPTIONS requests are handled early.
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # Custom: blocks direct access to /hidden-admin/login/ without the
    # session unlock flag set by /hidden-admin/unlock/.
    'hidden_admin.middleware.HiddenAdminProtectionMiddleware',
]


# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the Next.js dev server to call the Django API.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True   # Required so the session cookie is sent.
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


# ── Sessions ──────────────────────────────────────────────────────────────────
SESSION_ENGINE = "django.contrib.sessions.backends.db"
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"
# In production set SESSION_COOKIE_SECURE = True (HTTPS only).
SESSION_COOKIE_SECURE = False


# ── URL / Templates ───────────────────────────────────────────────────────────
ROOT_URLCONF = 'lifewood_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'lifewood_backend.wsgi.application'


# ── Database ──────────────────────────────────────────────────────────────────
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ── Password validation ───────────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ── Internationalisation ──────────────────────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ── Static files ──────────────────────────────────────────────────────────────
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ── Logging ───────────────────────────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "hidden_admin": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}
