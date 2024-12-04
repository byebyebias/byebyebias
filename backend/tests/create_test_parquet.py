import pandas as pd
import os

class CreateTestParquet:
    def __init__(self):
        data = {
            "sender_gender": ["Man", "Man", "Man", "Woman", "Woman"],
            "sender_race": ["White", "Asian", "Asian", "White", "White"],
            "receiver_gender": ["Woman", "Woman", "Woman", "Man", "Man"],
            "receiver_race": ["Hispanic", "Hispanic", "White", "Asian", "Black"],
            "is_fraud": [1, 0, 1, 0, 0],
            "predicted_fraud": [0, 0, 1, 0, 1]
        }
        df = pd.DataFrame(data)

        # writes the dataFrame to a Parquet file
        self.parquet_file_path = "test.parquet"
        df.to_parquet(self.parquet_file_path, engine="pyarrow")

    def destroy_parquet(self):
        if os.path.exists(self.parquet_file_path):
            os.remove(self.parquet_file_path)