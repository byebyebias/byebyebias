from django.urls import path
from .views import hello_world
from .views import get_dashboard_data
from .views import statistical_parity

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('metrics/', get_dashboard_data, name='get_dashboard_data'),
    path('spd/', statistical_parity, name='spd')
]
