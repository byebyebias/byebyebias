from backend.core.use_cases.interfaces import FileRepository

class ProcessLinkInteractor:
    def __init__(self, file_repo: FileRepository):
        self.file_repo = file_repo

    def post(self, response):
        return self.file_repo.save_file(response)