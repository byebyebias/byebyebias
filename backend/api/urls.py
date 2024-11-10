from django.urls import path
from .views import hello_world
# from .views import get_dashboard_data
from .views import upload_file

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    # path('metrics/', get_dashboard_data, name='get_dashboard_data'),
    path('upload/', upload_file, name="upload_file")
]
