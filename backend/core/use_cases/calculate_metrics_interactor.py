from backend.core.entities.bias_metrics import BiasMetrics
from aif360.algorithms.preprocessing import DisparateImpactRemover
from aif360.datasets import BinaryLabelDataset
from aif360.algorithms.postprocessing import RejectOptionClassification
from aif360.algorithms.postprocessing import EqOddsPostprocessing

class CalculateMetricsInteractor:
    def calculate(self, df, true_df, pred_df, protected_attributes):
        bias_metrics = BiasMetrics(df, true_df, pred_df, protected_attributes)

        all_metrics = bias_metrics.get_all_bias_metrics()
        getScore = bias_metrics.get_score(all_metrics)
        letter_grade = getScore[0]
        bias_score = getScore[1]

        formatted_metrics = self.reformat_metrics(all_metrics)

        return {
            "formatted_metrics": formatted_metrics,
            "letter_grade": letter_grade, 
            "bias_score": bias_score
        }
    
    def apply_di_remover(self, true_df, pred_df, protected_attributes, repair_level=0.8):
        # Convert Pandas DataFrames to BinaryLabelDataset
        print("Original True DataFrame:")
        print(true_df.head())

        print("Original Predicted DataFrame:")
        print(pred_df.head())

        print("Converting DataFrames to BinaryLabelDataset...")
        true_dataset = BinaryLabelDataset(
            favorable_label=1,
            unfavorable_label=0,
            df=true_df,
            label_names=['is_fraud'],
            protected_attribute_names=protected_attributes
        )
        pred_dataset = BinaryLabelDataset(
            favorable_label=1,
            unfavorable_label=0,
            df=pred_df,
            label_names=['predicted_fraud'],
            protected_attribute_names=protected_attributes
        )

        # Apply Disparate Impact Remover
        print("Applying Disparate Impact Remover...")
        di_remover = DisparateImpactRemover(repair_level=repair_level, sensitive_attribute=protected_attributes[0])
        true_dataset_repaired = di_remover.fit_transform(true_dataset)
        pred_dataset_repaired = di_remover.fit_transform(pred_dataset)


        # Convert repaired BinaryLabelDataset back to DataFrame
        print("Converting repaired datasets back to DataFrames...")
        true_df_repaired = true_dataset_repaired.convert_to_dataframe()[0]
        pred_df_repaired = pred_dataset_repaired.convert_to_dataframe()[0]

        print("Repaired True DataFrame:")
        print(true_df_repaired.head())
        print("Repaired Predicted DataFrame:")
        print(pred_df_repaired.head())

        # Calculate metrics for repaired data
        bias_metrics = BiasMetrics(true_df_repaired, pred_df_repaired, protected_attributes)
        all_metrics = bias_metrics.get_all_bias_metrics()
        bias_score = bias_metrics.get_score(all_metrics)
        formatted_metrics = self.reformat_metrics(all_metrics)

        return {
            "formatted_metrics": formatted_metrics,
            "bias_score": bias_score
        }



    def reformat_metrics(self, metrics_data):
        formatted_graph_data = []

        for metric in metrics_data:
            graph = { "title": metric }
            bar_values = []

            for protected_attribute in metrics_data[metric]:
                bar_values.append( {
                    "protected_attribute": protected_attribute,
                    "score": metrics_data[metric][protected_attribute]
                })
            
            graph['values'] = bar_values
            formatted_graph_data.append(graph)

        return formatted_graph_data