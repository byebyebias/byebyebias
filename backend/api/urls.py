from django.urls import path
from .views import hello_world, get_dashboard_data

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
     path('metrics/', get_dashboard_data, name='get_dashboard_data'),
]
