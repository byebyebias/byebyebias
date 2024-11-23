from django.test import TestCase
from backend.tests.create_test_parquet import CreateTestParquet
from backend.core.entities.file_converter import FileConverter
import pandas as pd

# python manage.py test backend.tests.test_file_converter

class TestFileConverter(TestCase):
    def setUp(self):
        self.df = pd.DataFrame(
            {"sender_gender": [1, 1, 1, 0, 0],
             "sender_race": [1, 0, 0, 1, 1]}
        )

        self.test_parquet = CreateTestParquet()
        self.file = FileConverter(self.test_parquet.parquet_file_path, protected_attributes=["sender_gender", "sender_race"])
    
    def tearDown(self):
        self.test_parquet.destroy_parquet()

    def test_file_converter(self):
        self.file.clean_dataset()

        # tests if dataset has been cleaned according to correct privileged groups
        self.assertTrue(self.file.df["sender_gender"].equals(self.df["sender_gender"]))
        self.assertTrue(self.file.df["sender_race"].equals(self.df["sender_race"]))
    
