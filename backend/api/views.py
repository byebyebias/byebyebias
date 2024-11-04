from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.actions.bias_metrics import get_bias_metrics
from backend.actions.converter import Converter
from backend.metrics.statistical_parity_difference import spd

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "ByeByeBias :)"})

@api_view(["GET"])
def get_dashboard_data(request):
    TEMP_TEST_FILE = "backend/api/transaction_triple_b.parquet"
    PROTECTED_ATTRIBUTE = 'sender_race'

    fileConverter = Converter(TEMP_TEST_FILE)
  
    # Format is {metric: float}
    bias_metrics = get_bias_metrics(
        fileConverter.get_true_df(), 
        fileConverter.get_pred_df(), 
        PROTECTED_ATTRIBUTE
    )

    return Response({
            "file_name": TEMP_TEST_FILE,
            "overview": {
                "score": "A+",
                "bias_score": "C+",
                "top_percentile": 50,
                "top_category": "ABC",
                "improvement_areas": ["BCD", "CDE"],

            },
            "metric_results": bias_metrics,

            }
        )

@api_view(['GET'])
def statistical_parity(request):
    # Assuming the CSV file is located at this path
    filename = "./data/example_data.csv"
    processed_data = spd(filename)  # Call spd with the filename
    
    # Assuming processed_data is in the correct format to be returned
    return Response(processed_data)  # Return the processed data as JSON