from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.actions.converter import Converter
from backend.metrics.statistical_parity_difference import spd
from backend.actions.bias_metrics import BiasMetrics
import pandas as pd
from django.core.files.storage import default_storage

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "ByeByeBias :)"})

@api_view(["POST"])
def get_dashboard_data(request):
    # TEMP_TEST_FILE = "backend/api/transaction_triple_b.parquet"
    print(request.data)

    file_name = request.data['filename']
    PROTECTED_ATTRIBUTES = ['sender_gender', 'sender_race']

    fileConverter = Converter(file_name)
  
    bias_metrics = BiasMetrics(
        fileConverter.get_true_df(), 
        fileConverter.get_pred_df(), 
        PROTECTED_ATTRIBUTES
    )

    all_metrics = bias_metrics.get_all_bias_metrics()
    bias_score = bias_metrics.get_score(all_metrics)
    formatted_graph_data = reformat_metrics_data(all_metrics)

    return Response({
            "file_name": file_name,
            "overview": {
                "score": bias_score,
                "top_category": "ABC",
            },
            "metric_results": formatted_graph_data,

            }
        )


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

@api_view(['GET'])
def statistical_parity(request):
    # Assuming the CSV file is located at this path
    filename = "./data/example_data.csv"
    processed_data = spd(filename)  # Call spd with the filename
    
    # Assuming processed_data is in the correct format to be returned
    return Response(processed_data)  # Return the processed data as JSON

@api_view(['POST'])
def upload_file(request):
    if 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        file_name = default_storage.save(uploaded_file.name, uploaded_file)
        file_path = default_storage.path(file_name)

        try:
            df = pd.read_parquet(file_path)
            print(df.head())  # For example, print first few rows

            # Return a success response with some relevant info if needed
            return Response({'status': 'success', 'message': 'File processed successfully'})

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})

    return Response({'status': 'error', 'message': 'No file provided or invalid request'})