from django.test import TestCase
from backend.tests.create_test_parquet import CreateTestParquet
from backend.core.entities.file_converter import FileConverter
from backend.core.entities.bias_metrics import BiasMetrics
import pandas as pd
import math

# python manage.py test backend.tests.test_bias_metrics

class TestBiasMetrics(TestCase):
    def setUp(self):
        self.df = pd.DataFrame(
            {"sender_gender": [1, 1, 1, 0, 0],
             "sender_race": [1, 0, 0, 1, 1]}
        )

        self.test_parquet = CreateTestParquet()
        file = FileConverter(self.test_parquet.parquet_file_path, protected_attributes=["sender_gender", "sender_race"])

        self.metrics = BiasMetrics(file.get_true_df(), file.get_pred_df(), file.protected_attributes)
    
    def tearDown(self):
        self.test_parquet.destroy_parquet()
        
    def test_get_score(self):
        result = self.metrics.get_score(self.metrics.get_all_bias_metrics())
        self.assertEqual(result, "F")


    def test_get_all_bias_metrics(self):
        result = self.metrics.get_all_bias_metrics()

        for metric in result:
            for key, value in result[metric].items():
                if math.isnan(value):
                    result[metric][key] = None

        correct = {
            "Disparate Impact": {"sender_gender": 0.67, "sender_race": 1.5}, 
            "Statistical Parity Difference": {"sender_gender": -0.17, "sender_race": 0.17}, 
            "Equal Opportunity Difference": {"sender_race": 1.0}, 
            "Average Odds Difference": {"sender_gender": None, "sender_race": 0.25}}
        self.assertDictEqual(result, correct)


    def test_get_bias_metrics(self):
        result = self.metrics.get_bias_metrics("sender_race")
        correct = {"Disparate Impact": 1.5, "Statistical Parity Difference": 0.17, "Average Odds Difference": 0.25, "Equal Opportunity Difference": 1.0}
        self.assertDictEqual(result, correct)
    

