from django.urls import path
from .views import upload_file
from .views import process_s3_link

urlpatterns = [
    path('upload/', upload_file, name="upload_file"), 
    path('process_s3_link/', process_s3_link, name="process_s3_link")
]
