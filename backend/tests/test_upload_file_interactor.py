import os
from unittest.mock import MagicMock
from django.test import TestCase
from django.core.files.storage import default_storage
from backend.core.data_access.file_repository import FileRepository
from backend.core.use_cases.upload_file_interactor import UploadFileInteractor
from django.core.files.uploadedfile import SimpleUploadedFile

from backend.tests.create_test_parquet import CreateTestParquet

# python manage.py test backend.tests.test_upload_file_interactor

class TestUploadFileInteractor(TestCase):
    def setUp(self):
        self.file = CreateTestParquet()
        self.file_path = self.file.parquet_file_path

        # ensure the file exists before the test
        self.assertTrue(os.path.exists(self.file_path), "Test file does not exist")

        with open(self.file_path, 'rb') as f:
            self.file_data = f.read()

        self.parquet_file = SimpleUploadedFile(
            'test.parquet',  
            self.file_data,
            content_type='application/octet-stream'
        )

        self.file_repo_mock = MagicMock(spec=FileRepository)
        self.file_repo_mock.save_file.return_value = ("test.parquet", "../media/test.parquet")
        self.upload_file_interactor = UploadFileInteractor(self.file_repo_mock)
    
    def tearDown(self):
        self.file.destroy_parquet()

    def test_post(self):
        file_name, file_path = self.upload_file_interactor.post(self.parquet_file)
        self.file_repo_mock.save_file.assert_called_once_with(uploaded_file=self.parquet_file)

        self.assertEqual(file_name, "test.parquet")
        self.assertEqual(file_path, "../media/test.parquet")