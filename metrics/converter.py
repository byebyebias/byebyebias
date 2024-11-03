import pandas
import os
import aif360.metrics
import pandas as pd
import aif360
import numpy as np

import itertools

from aif360.metrics import BinaryLabelDatasetMetric, MDSSClassificationMetric
from aif360.detectors import bias_scan

from aif360.algorithms.preprocessing.optim_preproc_helpers.data_preproc_functions import load_preproc_data_compas

from aif360.datasets import StructuredDataset
from aif360.datasets import BinaryLabelDataset
#from aif360.metrics import BinaryLabelDatasetMetric

#from aif360.datasets import BankDataset

import warnings
warnings.filterwarnings("ignore", category=UserWarning)  # Suppress PyTorch warnings

class Converter:
    def __init__(self, df):
        self.df = pandas.read_parquet(df)

        # encode the 'race' column as binary 
        race_map = {'White': 1, 'Black': 0, 'Hispanic': 0, 'Asian': 0,
                    'Mixed': 0, 'Other': 0} # placeholder
        self.df['receiver_race'] = self.df['receiver_race'].map(race_map)
        self.df['sender_race'] = self.df['sender_race'].map(race_map)

        # encode the 'gender' column
        gender_map = {'Male': 1, 'Female': 0} # placeholder
        self.df['receiver_gender'] = self.df['receiver_gender'].map(gender_map)
        self.df['sender_gender'] = self.df['sender_gender'].map(gender_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in ['sender_gender', 'receiver_gender', 'sender_race', 'receiver_race', 'is_fraud', 'predicted_fraud']])

        # print("SUM:")
        # print(self.df.isna().sum())
        # print("------")
        self.df = self.df.dropna()
    
    def get_df(self):
        return self.df
    
    def get_true_df(self):
        df = self.df.drop(columns=['predicted_fraud'])
        return df
    
    def get_pred_df(self):
        df = self.df.drop(columns=['is_fraud'])
        return df

# df = Converter('transaction_triple_b.parquet').get_pred_df()
