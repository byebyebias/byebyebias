from aif360.datasets import BinaryLabelDataset
from aif360.metrics.mdss_classification_metric import MDSSClassificationMetric

def calculate_disparate_impact(true_df, pred_df, protected_attribute: str) -> float:
    true_dataset = BinaryLabelDataset(favorable_label=1.0, unfavorable_label=0.0, df=true_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])
    pred_dataset = BinaryLabelDataset(favorable_label=1.0, unfavorable_label=0.0, df=pred_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])

    metric = MDSSClassificationMetric(true_dataset, pred_dataset, privileged_groups=[{protected_attribute: 1.0}], unprivileged_groups=[{protected_attribute: 0.0}])
    return metric.disparate_impact()