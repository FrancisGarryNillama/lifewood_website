"""
Django settings for lifewood_backend project.
"""

import os
from pathlib import Path
from urllib.parse import parse_qsl, urlparse

BASE_DIR = Path(__file__).resolve().parent.parent


def _env_list(name: str, default: str) -> list[str]:
    raw_value = os.environ.get(name, default)
    return [item.strip() for item in raw_value.split(",") if item.strip()]


def _database_config_from_env(default_path: Path) -> dict:
    database_url = os.environ.get("DATABASE_URL", "").strip()
    if not database_url:
        return {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": default_path,
        }

    parsed = urlparse(database_url)
    engine_map = {
        "postgres": "django.db.backends.postgresql",
        "postgresql": "django.db.backends.postgresql",
        "pgsql": "django.db.backends.postgresql",
        "mysql": "django.db.backends.mysql",
        "sqlite": "django.db.backends.sqlite3",
    }
    engine = engine_map.get(parsed.scheme)
    if not engine:
        raise ValueError(f"Unsupported DATABASE_URL scheme: {parsed.scheme}")

    if engine == "django.db.backends.sqlite3":
        sqlite_path = parsed.path.lstrip("/") or str(default_path)
        return {
            "ENGINE": engine,
            "NAME": sqlite_path,
        }

    options = dict(parse_qsl(parsed.query))
    config = {
        "ENGINE": engine,
        "NAME": parsed.path.lstrip("/"),
        "USER": parsed.username or "",
        "PASSWORD": parsed.password or "",
        "HOST": parsed.hostname or "",
        "PORT": str(parsed.port or ""),
    }
    if options:
        config["OPTIONS"] = options
    return config

# ── Security ──────────────────────────────────────────────────────────────────
SECRET_KEY = 'django-insecure-mz_i&rgrhb2efw04%hr&4l_n*7310y2(=^xkjp*-&at4)j-+r1'

DEBUG = True   # Set to False and configure properly before deploying to production.

ALLOWED_HOSTS = _env_list("ALLOWED_HOSTS", "localhost,127.0.0.1")


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
CORS_ALLOWED_ORIGINS = _env_list(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
)
CORS_ALLOW_CREDENTIALS = True   # Required so the session cookie is sent.
CSRF_TRUSTED_ORIGINS = _env_list(
    "CSRF_TRUSTED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
)


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
    'default': _database_config_from_env(BASE_DIR / 'db.sqlite3')
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
STORAGE_BUCKET_URL = os.environ.get("STORAGE_BUCKET_URL", "").rstrip("/")
FRONTEND_BASE_URL = os.environ.get("FRONTEND_BASE_URL", "").rstrip("/")
BRAND_LOGO_URL = os.environ.get("BRAND_LOGO_URL", "").rstrip("/")
MEDIA_URL = f"{STORAGE_BUCKET_URL}/" if STORAGE_BUCKET_URL else "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", "Lifewood HR <hr@lifewood.local>")
EMAIL_SERVICE_API_KEY = os.environ.get("EMAIL_SERVICE_API_KEY", "")
EMAIL_HOST = os.environ.get("EMAIL_HOST", "")
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "587"))
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", "true").lower() == "true"


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
