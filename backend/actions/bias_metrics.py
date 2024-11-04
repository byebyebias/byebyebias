from aif360.datasets import BinaryLabelDataset
from aif360.metrics.mdss_classification_metric import MDSSClassificationMetric

def get_bias_metrics(true_df, pred_df, protected_attribute: str) -> dict[str: float]:
    true_df.rename(columns={'is_fraud':'fraud_result'}, inplace=True)
    pred_df.rename(columns={'predicted_fraud':'fraud_result'}, inplace=True)

    return calculate_bias_metrics(true_df, pred_df, protected_attribute)

def calculate_bias_metrics(true_df, pred_df, protected_attribute) -> dict[str: float]:
    metrics = {}
    true_dataset = BinaryLabelDataset(favorable_label=1, unfavorable_label=0, df=true_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])
    pred_dataset = BinaryLabelDataset(favorable_label=1, unfavorable_label=0, df=pred_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])
    metric = MDSSClassificationMetric(true_dataset, pred_dataset, privileged_groups=[{protected_attribute: 1.0}], unprivileged_groups=[{protected_attribute: 0.0}])

    metrics['Disparate Impact'] = round(float(metric.disparate_impact()), 2)
    metrics['Disparate Impact'] = metric.disparate_impact()
    metrics['Statistical Parity Difference'] = round(float(metric.statistical_parity_difference()), 2)
    metrics['Average Odds Difference'] = round(float(metric.average_odds_difference()), 2)
    
    # check to see if equal opportunity difference can be calculated
    privileged_positives = true_df[(true_df[protected_attribute] == 1) & (true_df['fraud_result'] == 1)]
    unprivileged_positives = true_df[(true_df[protected_attribute] == 0) & (true_df['fraud_result'] == 1)]
    if len(privileged_positives) > 0 and len(unprivileged_positives) > 0:
        metrics['Equal Opportunity Difference'] = round(float(metric.equal_opportunity_difference()), 2)

    return metrics
