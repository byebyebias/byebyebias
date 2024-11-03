from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.metrics.statistical_parity_difference import spd

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "ByeByeBias :)"})

@api_view(['GET'])
def statistical_parity(request):
    # Assuming the CSV file is located at this path
    filename = "./data/example_data.csv"
    processed_data = spd(filename)  # Call spd with the filename
    
    # Assuming processed_data is in the correct format to be returned
    return Response(processed_data)  # Return the processed data as JSON