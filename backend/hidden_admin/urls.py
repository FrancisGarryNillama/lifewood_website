from django.urls import path
from . import views

app_name = "hidden_admin"

urlpatterns = [
    path("unlock/", views.unlock, name="unlock"),
    path("login/",  views.hidden_login, name="login"),
    path("logout/", views.hidden_logout, name="logout"),
]