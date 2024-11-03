from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.metrics.statistical_parity_difference import spd
import pandas as pd
from django.core.files.storage import default_storage

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