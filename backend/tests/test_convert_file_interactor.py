from django.test import TestCase
from unittest.mock import MagicMock, patch

from backend.core.entities.file_converter import FileConverter
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from backend.tests.create_test_parquet import CreateTestParquet
import pandas as pd

# python manage.py test backend.tests.test_convert_file_interactor

class TestConvertFileInteractor(TestCase):
    def setUp(self):
        self.test_parquet = CreateTestParquet()

    @patch('backend.core.use_cases.convert_file_interactor.FileConverter')
    def test_convert(self, MockFileConverter):
        mock_file_converter_instance = MagicMock()

        mock_file_converter_instance.get_true_df.return_value = pd.DataFrame({"is_fraud": []})
        mock_file_converter_instance.get_pred_df.return_value = pd.DataFrame({"predicted_fraud": []})
        mock_file_converter_instance.get_df.return_value = pd.DataFrame({"is_fraud": [], "predicted_fraud": []})
        mock_file_converter_instance.get_privileged_groups.return_value = "Privileged Groups"

        MockFileConverter.return_value = mock_file_converter_instance

        interactor_instance = ConvertFileInteractor()
        result = interactor_instance.convert(self.test_parquet.parquet_file_path, protected_attributes=["sender_gender", "sender_race"])

        mock_file_converter_instance.get_true_df.assert_called_once()
        mock_file_converter_instance.get_pred_df.assert_called_once()
        mock_file_converter_instance.get_df.assert_called_once()
        mock_file_converter_instance.get_privileged_groups.assert_called_once()

        