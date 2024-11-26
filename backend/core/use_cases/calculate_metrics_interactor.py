from backend.core.entities.bias_metrics import BiasMetrics

class CalculateMetricsInteractor:
    def calculate(self, df, true_df, pred_df, protected_attributes):
        bias_metrics = BiasMetrics(df, true_df, pred_df, protected_attributes)

        all_metrics = bias_metrics.get_all_bias_metrics()
        bias_score = bias_metrics.get_score()

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