import pandas as pd
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import MDSSClassificationMetric

# setup
ground_truth_data = {
    'Transaction_ID': [1, 2, 3, 4, 5, 6],
    'Transaction_Amount': [500, 100, 3, 50, 250, 400],
    'Sender_Id': [2, 4, 2, 5, 3, 6],
    'Sender_ZIPCode': [45368, 45368, 45368, 45368, 45368, 45368],
    'Sender_Race': [0, 1, 0, 1, 0, 1],
    'Sender_Age': [0, 1, 1, 0, 1, 0],
    'Sender_Gender': [0, 1, 0, 1, 0, 1],
    'Receiver_Id': [3, 2, 5, 2, 7, 8],
    'Receiver_ZIPCode': [45505, 45505, 45505, 45505, 45505, 45505],
    'Receiver_Race': [1, 0, 1, 1, 0, 1],
    'Receiver_Age': [1, 0, 1, 1, 0, 1],
    'Receiver_Gender': [0, 1, 1, 0, 1, 0],
    'Fraud': [1, 1, 1, 1, 0, 0],  
}

predicted_data = {
    'Transaction_ID': [1, 2, 3, 4, 5, 6],
    'Transaction_Amount': [500, 100, 3, 50, 250, 400],
    'Sender_Id': [2, 4, 2, 5, 3, 6],
    'Sender_ZIPCode': [45368, 45368, 45368, 45368, 45368, 45368],
    'Sender_Race': [0, 1, 0, 1, 0, 1],
    'Sender_Age': [0, 1, 1, 0, 1, 0],
    'Sender_Gender': [0, 1, 0, 1, 0, 1],
    'Receiver_Id': [3, 2, 5, 2, 7, 8],
    'Receiver_ZIPCode': [45505, 45505, 45505, 45505, 45505, 45505],
    'Receiver_Race': [1, 0, 1, 1, 0, 1],
    'Receiver_Age': [1, 0, 1, 1, 0, 1],
    'Receiver_Gender': [0, 1, 1, 0, 1, 0],
    'Fraud': [1, 0, 1, 0, 0, 1],  
}

df_ground_truth = pd.DataFrame(ground_truth_data)
df_predicted = pd.DataFrame(predicted_data)

privileged_group = df_ground_truth[(df_ground_truth['Sender_Gender'] == 1) & (df_ground_truth['Fraud'] == 1)]
unprivileged_group = df_ground_truth[(df_ground_truth['Sender_Gender'] == 0) & (df_ground_truth['Fraud'] == 1)]

# print("Count of positive labels in privileged group:", len(privileged_group))
# print("Count of positive labels in unprivileged group:", len(unprivileged_group))

if len(privileged_group) == 0 or len(unprivileged_group) == 0:
    print("Warning: One of the groups has no positive labels. Cannot continue.")
else:
    print("Can proceed.")

    ground_truth_dataset = BinaryLabelDataset(
        favorable_label=1,
        unfavorable_label=0,
        df=df_ground_truth, 
        label_names=['Fraud'], 
        protected_attribute_names=['Sender_Gender'],  
        privileged_protected_attributes=[[1]] 
    )

    predicted_dataset = BinaryLabelDataset(
        favorable_label=1,
        unfavorable_label=0,
        df=df_predicted,  # Use the predicted labels
        label_names=['Fraud'], 
        protected_attribute_names=['Sender_Gender'],  
        privileged_protected_attributes=[[1]]  
    )

    metric = MDSSClassificationMetric(
        ground_truth_dataset,
        predicted_dataset,
        "Bernoulli",
        unprivileged_groups=[{'Sender_Gender': 0}],  
        privileged_groups=[{'Sender_Gender': 1}]
    )

    equal_opportunity_diff = metric.equal_opportunity_difference()
    print("Equal Opportunity Difference:", equal_opportunity_diff)
