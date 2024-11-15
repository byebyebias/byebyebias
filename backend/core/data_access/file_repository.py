from django.core.files.storage import default_storage
from backend.setup.settings import MEDIA_ROOT
import os

class FileRepository:

    def save_file(self, uploaded_file):
        print("input", uploaded_file)
        file_name = default_storage.save(uploaded_file.name, uploaded_file)
        print("name", file_name)
        file_path = default_storage.path(file_name)
        print("path", file_path)
        return (file_name, file_path)
    
    def retrieve_s3_file(self, response):
        if 'Content-Disposition' in response.headers:
            content_disposition = response.headers['Content-Disposition']
            file_name = content_disposition.split("filename=")[-1].strip('"')
        else:
            file_name = response.url.split("/")[-1]
        
        file_path = os.path.join(MEDIA_ROOT, file_name)

        # write the contents to the file
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):  
                f.write(chunk)

        return (file_name, file_path)