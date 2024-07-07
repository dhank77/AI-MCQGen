from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('change-password/', views.change_password),
    path('quiz', include('admin.quiz.urls')),
]