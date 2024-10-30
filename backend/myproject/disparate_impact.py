from aif360.datasets import BinaryLabelDataset
from aif360.metrics.mdss_classification_metric import MDSSClassificationMetric
import pandas as pd
import pyarrow.parquet as pq

# table = pq.read_table('transaction_triple_b.parquet')

# # create pandas dataframe from parquet file
# df = table.to_pandas()

true_data = [[1, 1], [0, 0], [1, 1], [0, 0], [1, 0], [0, 0]]
pred_data = [[1, 0], [0, 1], [1, 1], [0, 0], [1, 0], [0, 1]]

true_df = pd.DataFrame(true_data, columns=['sender_gender', 'fraud_result'])
pred_df = pd.DataFrame(pred_data, columns=['sender_gender', 'fraud_result'])

# default privileged protected attribute is the highest numerical value of each protected attribute
# create BinaryLabelDataset for the is_fraud
true_dataset = BinaryLabelDataset(favorable_label=0.0, unfavorable_label=1.0, df=true_df, label_names=['fraud_result'], protected_attribute_names=['sender_gender'])

# create BinarylabelDataset for the pred_fraud
pred_dataset = BinaryLabelDataset(favorable_label=0.0, unfavorable_label=1.0, df=pred_df, label_names=['fraud_result'], protected_attribute_names=['sender_gender'])

metric = MDSSClassificationMetric(true_dataset, pred_dataset, privileged_groups=[{'sender_gender': 1.0}], unprivileged_groups=[{'sender_gender': 0.0}])

disparate_impact = metric.disparate_impact()

print("Disparate Impact (Gender): ", disparate_impact)

