from django.test import TestCase
from backend.tests.create_test_parquet import CreateTestParquet
from backend.core.adapters.impl_file_converter import ImplFileConverter
import pandas as pd

# python manage.py test backend.tests.test_impl_file_converter

class TestFileConverter(TestCase):
    def setUp(self):
        self.df = pd.DataFrame(
            {"sender_gender": [1, 1, 1, 0, 0],
             "sender_race": [0, 1, 1, 0, 0]}
        )

        self.test_parquet = CreateTestParquet()
        self.file = ImplFileConverter(self.test_parquet.parquet_file_path, protected_attributes=["sender_gender", "sender_race"])

    def tearDown(self):
        self.test_parquet.destroy_parquet()

    def test_file_converter(self):
        # tests if dataset has been cleaned according to correct privileged groups
        print(self.file.df["sender_race"])
        print(self.df["sender_race"])
        self.assertTrue(self.file.df["sender_gender"].reset_index(drop=True).equals(self.df["sender_gender"].reset_index(drop=True)))
        self.assertTrue(self.file.df["sender_race"].reset_index(drop=True).equals(self.df["sender_race"].reset_index(drop=True)))