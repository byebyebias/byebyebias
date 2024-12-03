from backend.core.data_access.file_repository import FileRepository

class ProcessLinkInteractor:
    def __init__(self, file_repo: FileRepository):
        self.file_repo = file_repo

    def post(self, response):
        return self.file_repo.retrieve_s3_file(response)