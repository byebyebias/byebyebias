import pandas as pd
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import MDSSClassificationMetric

# privileged is 1 for man
# unprivileged is 0 for woman
# 'Is_Fraud': [0, 1, 1, 0],
# 'Predicted_Fraud': [1, 0, 1, 0],

def get_average_odds(truth_df, prediction_df, label_name, protected_attribute="Sender_Gender", privileged_groups=0, unprivileged_groups=1):
    """
    :param truth_df: pandas dataframe with true values of fraud (1,0)
    :param prediction_df: pandas dataframe with predicted values of fraud (1,0)
    :param label_name: the column name which contains the true/predicted values of fraud in the df's
    :param protected_attribute: what attribute to analyze, defaults to gender
    :return: average_odds_difference, which is a real number
    """

    dataset = BinaryLabelDataset(
        df=truth_df,
        label_names=[label_name],
        protected_attribute_names=[protected_attribute],
        favorable_label=1,
        unfavorable_label=0,
    )

    predicted_data = BinaryLabelDataset(
        df=prediction_df,
        label_names=[label_name],
        protected_attribute_names=[protected_attribute],
        favorable_label=1,
        unfavorable_label=0
    )

    metric = MDSSClassificationMetric(
        dataset=dataset,
        classified_dataset=predicted_data,
        privileged_groups=[{protected_attribute: privileged_groups}],
        unprivileged_groups=[{protected_attribute: unprivileged_groups}]
    )

    avg_odds_diff = metric.average_odds_difference()

    print("Average Odds Difference:", avg_odds_diff)
    return avg_odds_diff


dataTrue = {
    'Sender_Gender': [1, 0, 1, 0],
    'Fraud_Result': [1, 0, 0, 1]
}

dataPred = {
    'Sender_Gender': [1, 0, 1, 0],
    'Fraud_Result': [0, 1, 0, 1]
}

dfTrue = pd.DataFrame(dataTrue)
dfPred = pd.DataFrame(dataPred)

get_average_odds(dfTrue, dfPred, "Fraud_Result")
