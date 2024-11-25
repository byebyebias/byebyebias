from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.core.data_access.file_repository import FileRepository
from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from django.views.decorators.csrf import csrf_exempt
import os

from .data import PROCESSING_TECHNIQUES

@csrf_exempt
@api_view(['POST'])
def upload_file(request):
    try:
        print("Request received.")
        if 'file' not in request.FILES:
            return Response({'status': 'error', 'message': 'No file provided or invalid request'})
        
        uploaded_file = request.FILES['file']
        print("File uploaded:", uploaded_file.name)

        file_repo = FileRepository()
        calculate_metrics = CalculateMetricsInteractor()
        convert_file = ConvertFileInteractor()

        # Save the file and process
        file_name, file_path = file_repo.save_file(uploaded_file)
        print("File saved at:", file_path)

        protected_attributes = ['sender_race', 'sender_gender']
        true_df, pred_df = convert_file.convert(file_path, protected_attributes)
        print("DataFrames created.")

        original_results = calculate_metrics.calculate(true_df.copy(), pred_df.copy(), protected_attributes)
        print("original results:", original_results)
        # Call apply_di_remover
        results = calculate_metrics.apply_post_processing(true_df, pred_df, protected_attributes)
        print("apply_di_remover results:", results)

        print(original_results == results)

        if os.path.exists(file_path):
            os.remove(file_path)

        return Response({
            "file_name": file_name,
            "overview": {
                "score": results["bias_score"],
                "top_category": "ABC",
            },
            "metric_results": results["formatted_metrics"],
        })

    except Exception as e:
        print("Exception occurred:", str(e))
        return Response({'status': 'error', 'message': str(e)})

    @api_view(['GET'])
    def get_processing_techniques(request):
        """
        Retrieve all processing techniques with their descriptions.
        """
        try:
            techniques = [
                {'name': key, 'description': value['description']}
                for key, value in PROCESSING_TECHNIQUES.items()
            ]
            return Response({'processing_techniques': techniques})
            
        except Exception as e:
            return Response({'error': str(e)}, status=500)


    @api_view(['GET'])
    def get_processing_technique_details(request, technique_name):
        """
        Retrieve details of a specific processing technique, including its algorithms.
        """

        try:
            technique = PROCESSING_TECHNIQUES.get(technique_name)
            if not technique:
                return Response({'error': 'Processing technique not found'}, status=404)

            return Response({
                'name': technique_name,
                'description': technique['description'],
                'algorithms': list(technique['algorithms'].keys())
            })
        except Exception as e:
            return Response({'error': str(e)}, status=500)


    @api_view(['GET'])
    def get_algorithm_details(request, technique_name, algorithm_name):
        """
        Retrieve details of a specific algorithm under a processing technique.
        """
        try:
            technique = PROCESSING_TECHNIQUES.get(technique_name)
            if not technique:
                return Response({'error': 'Processing technique not found'}, status=404)

            algorithm = technique['algorithms'].get(algorithm_name)
            if not algorithm:
                return Response({'error': 'Algorithm not found'}, status=404)

            return Response({
                'technique': technique_name,
                'algorithm': algorithm_name,
                'details': algorithm
            })
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    