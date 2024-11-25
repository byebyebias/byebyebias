from django.urls import path
from .views import (
    upload_file,
    get_processing_techniques,
    get_processing_technique_details,
    get_algorithm_details,
)

urlpatterns = [
    path('upload/', upload_file, name="upload_file"),
    path('processing-techniques/', get_processing_techniques, name='get_processing_techniques'),
    path('processing-techniques/<str:technique_name>/', get_processing_technique_details, name='get_processing_technique_details'),
    path('processing-techniques/<str:technique_name>/<str:algorithm_name>/', get_algorithm_details, name='get_algorithm_details'),
]