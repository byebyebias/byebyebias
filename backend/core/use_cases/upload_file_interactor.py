from backend.core.use_cases.interfaces import FileRepository

class UploadFileInteractor:
    def __init__(self, file_repo: FileRepository):
        self.file_repo = file_repo

    def post(self, raw_file):
        # file_name and file_path from file_repo
        return self.file_repo.save_file(uploaded_file=raw_file)