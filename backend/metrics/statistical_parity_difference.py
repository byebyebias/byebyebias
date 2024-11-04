import pandas as pd
from aif360.metrics import MDSSClassificationMetric
from aif360.datasets import BinaryLabelDataset


def spd(filename: str):

    # Store sample dataset as dataframe
    # Dataset contains binary values
    df = pd.read_csv("./data/example_data.csv")

    label_names = ["Is_Fraud"]

    # attribute to analyze bias for
    protected_attribute_names = ["Sender_Gender"]

    # This dataset analyzes ground truth values
    dataset = BinaryLabelDataset(df=df, label_names=label_names, protected_attribute_names=protected_attribute_names, favorable_label=1, unfavorable_label=0)

    # Modifies original dataset to contain only predictions
    classified_dataset = dataset.copy()
    classified_dataset.labels = df['Predicted_Fraud'].values.reshape(-1, 1)

    # Compares ground truth values to predicted values
    metric = MDSSClassificationMetric(dataset=dataset, classified_dataset=classified_dataset, unprivileged_groups=[{'Sender_Gender': 0}], privileged_groups=[{'Sender_Gender': 1}])
    statistical_parity_difference = metric.statistical_parity_difference()

    return [{"attribute": protected_attribute_name, "metric_value": statistical_parity_difference} for protected_attribute_name in protected_attribute_names]

    # Store sample dataset as dataframe
    # Dataset contains binary values
    df = pd.read_csv("./data/example_data.csv")

    label_names = ["Is_Fraud"]

    # attribute to analyze bias for
    protected_attribute_names = ["Sender_Gender"]

    # This dataset analyzes ground truth values
    dataset = BinaryLabelDataset(df=df, label_names=label_names, protected_attribute_names=protected_attribute_names, favorable_label=1, unfavorable_label=0)

    # Modifies original dataset to contain only predictions
    classified_dataset = dataset.copy()
    classified_dataset.labels = df['Predicted_Fraud'].values.reshape(-1, 1)

    # Compares ground truth values to predicted values
    metric = MDSSClassificationMetric(dataset=dataset, classified_dataset=classified_dataset, unprivileged_groups=[{'Sender_Gender': 0}], privileged_groups=[{'Sender_Gender': 1}])
    statistical_parity_difference = metric.statistical_parity_difference()

    return [{"attribute": protected_attribute_name, "metric_value": statistical_parity_difference} for protected_attribute_name in protected_attribute_names]
