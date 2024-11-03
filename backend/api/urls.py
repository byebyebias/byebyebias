from django.urls import path
from .views import hello_world
from .views import statistical_parity

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('spd/', statistical_parity, name='spd'), 
     path('upload/', upload_file, name="upload_file")
]
