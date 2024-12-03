from aif360.datasets import BinaryLabelDataset
from aif360.metrics.mdss_classification_metric import MDSSClassificationMetric
import pandas as pd

class ImplBiasMetrics:
    '''
    BiasMetrics object contains bias metrics.
    '''

    def __init__(self, df: pd.DataFrame, true_df: pd.DataFrame, pred_df: pd.DataFrame, protected_attributes: list[str]):
        self.df = df
        self.true_df = true_df
        self.pred_df = pred_df
        self.protected_attributes = protected_attributes

    def get_all_bias_metrics(self) -> dict[str: dict[str: float]]:
        protected_attribute_metrics = {}
        for protected_attribute in self.protected_attributes:
            protected_attribute_metrics[protected_attribute] = self.get_bias_metrics(protected_attribute)  

        metric_to_protected_attribute = {}
        for attribute, metrics in protected_attribute_metrics.items():
            for metric, value in metrics.items():
                if metric not in metric_to_protected_attribute:
                    metric_to_protected_attribute[metric] = {}
                metric_to_protected_attribute[metric][attribute] = value
        
        return metric_to_protected_attribute

    def get_score(self, all_bias_metrics) -> tuple[str, float]:
        num_of_fairs = []

        for metric, protected_attribute_to_value in all_bias_metrics.items():
            values = list(protected_attribute_to_value.values())
            # refactor to a function 
            if metric == 'Disparate Impact':
                for value in values:
                    if 0.43 <= value <= 1.47:
                        num_of_fairs.append(1)
                    else:
                        num_of_fairs.append(0)
            elif metric == 'Statistical Parity Difference':
                for value in values:
                    if -0.03 <= value <= 0.01:
                        num_of_fairs.append(1)
                    else:
                        num_of_fairs.append(0)
            elif metric == 'Average Odds Difference':
                for value in values:
                    if -0.43 <= value <= 0.12:
                        num_of_fairs.append(1)
                    else:
                        num_of_fairs.append(0)
            else:
                for value in values:
                    if -0.85 <= value <= 0.23:
                        num_of_fairs.append(1)
                    else:
                        num_of_fairs.append(0)

        percent = sum(num_of_fairs) / len(num_of_fairs) * 100

        # assign letter grade

        if 90 <= percent <= 100:
            letter_grade = 'A+'
        elif 85 <= percent:
            letter_grade = 'A'
        elif 80 <= percent:
            letter_grade = 'A-'
        elif 77 <= percent:
            letter_grade = 'B+'
        elif 73 <= percent:
            letter_grade = 'B'
        elif 70 <= percent:
            letter_grade = 'B-'
        elif 67 <= percent:
            letter_grade = 'C+'
        elif 63 <= percent:
            letter_grade = 'C'
        elif 60 <= percent:
            letter_grade = 'C-'
        elif 57 <= percent:
            letter_grade = 'D+'
        elif 53 <= percent:
            letter_grade = 'D'
        elif 50 <= percent:
            letter_grade = 'D-'
        else:
            letter_grade = 'F'
        
        return (letter_grade, round(percent,2))

    def get_bias_metrics(self, protected_attribute: str) -> dict[str: float]:
        self.true_df.rename(columns={'is_fraud':'fraud_result'}, inplace=True)
        self.pred_df.rename(columns={'predicted_fraud':'fraud_result'}, inplace=True)

        return self.calculate_bias_metrics(protected_attribute)

    def calculate_bias_metrics(self, protected_attribute) -> dict[str: float]:
        metrics = {}
        true_dataset = BinaryLabelDataset(favorable_label=1, unfavorable_label=0, df=self.true_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])
        pred_dataset = BinaryLabelDataset(favorable_label=1, unfavorable_label=0, df=self.pred_df, label_names=['fraud_result'], protected_attribute_names=[protected_attribute])
        metric = MDSSClassificationMetric(true_dataset, pred_dataset, privileged_groups=[{protected_attribute: 1.0}], unprivileged_groups=[{protected_attribute: 0.0}])

        metrics['Disparate Impact'] = round(float(metric.disparate_impact()), 2)
        metrics['Statistical Parity Difference'] = round(float(metric.statistical_parity_difference()), 2)
        metrics['Average Odds Difference'] = round(float(metric.average_odds_difference()), 2)
        
        # check to see if equal opportunity difference can be calculated
        privileged_positives = self.true_df[(self.true_df[protected_attribute] == 1) & (self.true_df['fraud_result'] == 1)]
        unprivileged_positives = self.true_df[(self.true_df[protected_attribute] == 0) & (self.true_df['fraud_result'] == 1)]
        if len(privileged_positives) > 0 and len(unprivileged_positives) > 0:
            metrics['Equal Opportunity Difference'] = round(float(metric.equal_opportunity_difference()), 2)

        return metrics

    def get_accuracy(self) -> float:
        accuracy = (self.df["is_fraud"] == self.df["predicted_fraud"]).mean()
        percent = round(accuracy * 100, 2)
        return percent
