from django.urls import path

from . import views

urlpatterns = [
    path('get_by_date/', views.get_by_date, name='Get by date'),
]