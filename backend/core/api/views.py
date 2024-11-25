from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.core.data_access.file_repository import FileRepository
from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from django.views.decorators.csrf import csrf_exempt
import os

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
    