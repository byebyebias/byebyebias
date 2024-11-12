from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.entities.file_converter import FileConverter
from backend.entities.bias_metrics import BiasMetrics
import pandas as pd
from django.core.files.storage import default_storage

def reformat_metrics_data(metrics_data):
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

@api_view(['POST'])
def upload_file(request):
    if 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        file_name = default_storage.save(uploaded_file.name, uploaded_file)
        file_path = default_storage.path(file_name)

        try:
            # Set up protected attributes and instantiate Converter
            PROTECTED_ATTRIBUTES = ['sender_gender', 'sender_race']
            file_converter = FileConverter(file_path, PROTECTED_ATTRIBUTES)

            # Calculate bias metrics
            bias_metrics = BiasMetrics(
                file_converter.get_true_df(), 
                file_converter.get_pred_df(), 
                PROTECTED_ATTRIBUTES
            )

            all_metrics = bias_metrics.get_all_bias_metrics()
            bias_score = bias_metrics.get_score(all_metrics)
            formatted_graph_data = reformat_metrics_data(all_metrics)

            # Return the results including file information and metrics
            return Response({
                "file_name": file_name,
                "file_path": file_path,
                "overview": {
                    "score": bias_score,
                    "top_category": "ABC", 
                },
                "metric_results": formatted_graph_data,
            })

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})

    return Response({'status': 'error', 'message': 'No file provided or invalid request'})