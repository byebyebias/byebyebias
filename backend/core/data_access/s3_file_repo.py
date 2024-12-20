import os
from backend.core.use_cases.interfaces import FileRepository
from backend.setup.settings import MEDIA_ROOT

class S3FileRepo():
   def save_file(self, response):
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
        
