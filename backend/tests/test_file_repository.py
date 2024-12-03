from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.storage import default_storage
from django.test import TestCase
from unittest.mock import patch

from backend.tests.create_test_parquet import CreateTestParquet
import os
from backend.core.data_access.file_repository import FileRepository

# python manage.py test backend.tests.test_file_repository
# DJANGO_SETTINGS_MODULE=backend.setup.settings pytest --cov=backend --cov-html


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

    @patch('backend.core.data_access.file_repository.default_storage')
    def test_save_file(self, mock_storage):
        mock_storage.save.return_value = "test.parquet"
        mock_storage.path.return_value = "../media/test.parquet"
        mock_storage.exists.return_value = True

        file_name, file_path = FileRepository().save_file(self.parquet_file)

        # for tearDown method
        self.saved_file_path = file_path

        self.assertTrue(file_name.startswith("test"))
        self.assertTrue(file_name.endswith(".parquet"))

        self.assertTrue(mock_storage.exists(file_path))

        # check if 'save' and 'exists' methods were called
        mock_storage.save.assert_called_with(self.parquet_file.name, self.parquet_file)
        mock_storage.exists.assert_called_with(file_path)