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
    
    def pq_to_df(self):
        # encode the 'sender_race' column as binary 
        race_map = {'White': 0, 'Black': 1, 'Hispanic': 1, 'Asian': 1,
                    'Mixed': 1, 'Other': 1}
        self.df['receiver_race'] = self.df['receiver_race'].map(race_map)
        self.df['sender_race'] = self.df['sender_race'].map(race_map)

        # encode the 'sender_gender' column
        sex_map = {'Male': 0, 'Female': 1}
        self.df['receiver_gender'] = self.df['receiver_gender'].map(sex_map)
        self.df['sender_gender'] = self.df['sender_gender'].map(sex_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in ['sender_gender', 'receiver_gender', 'sender_race', 'receiver_race', 'is_fraud', 'predicted_fraud']])

        print("SUM:")
        print(self.df.isna().sum())
        print("------")
        self.df = self.df.dropna()

        return self.df


# akshata's code

df = Converter('transaction_triple_b.parquet').pq_to_df()

label_names = ["is_fraud"]
protected_attribute_names = ["sender_gender"]

sd = BinaryLabelDataset(df=df, label_names=label_names, protected_attribute_names=protected_attribute_names, favorable_label=1, unfavorable_label=0)
metric = BinaryLabelDatasetMetric(sd, unprivileged_groups=[{'sender_gender': 0}], privileged_groups=[{'sender_gender': 1}])
statistical_parity_difference = metric.statistical_parity_difference()

print("Statistical Parity Difference:", statistical_parity_difference)
