from backend.core.use_cases.interfaces import FileRepository
from django.core.files.storage import default_storage

class LocalFileRepo():
    def save_file(self, uploaded_file):
        file_name = default_storage.save(uploaded_file.name, uploaded_file)
        file_path = default_storage.path(file_name)
        return (file_name, file_path)