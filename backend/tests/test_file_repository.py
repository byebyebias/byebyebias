from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.storage import default_storage
from django.test import TestCase

from backend.tests.create_test_parquet import CreateTestParquet
import os
from backend.core.data_access.file_repository import FileRepository

# python manage.py test backend.tests.test_file_repository

class TestFileRepository(TestCase):

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

    def tearDown(self):
        self.file.destroy_parquet()
        if default_storage.exists(self.saved_file_path):
            default_storage.delete(self.saved_file_path)

    def test_save_file(self):
        file_name, file_path = FileRepository().save_file(self.parquet_file)

        # for tearDown method
        self.saved_file_path = file_path

        self.assertTrue(file_name.startswith("test"))
        self.assertTrue(file_name.endswith(".parquet"))

        self.assertTrue(default_storage.exists(file_path))