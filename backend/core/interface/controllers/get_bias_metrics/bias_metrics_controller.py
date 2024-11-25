from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor

import os
from rest_framework.response import Response

class BiasMetricsController():
    def __init__(self, calculate_metrics_interactor: CalculateMetricsInteractor, 
                 convert_file_interactor: ConvertFileInteractor):
        self.calculate_metrics_interactor = calculate_metrics_interactor()
        self.convert_file_interactor = convert_file_interactor()

    def get_bias_metrics(self, request):
        if 'file' not in request.FILES:
            return Response(
                {
                    'status': 'error', 
                    'message': 'No file provided or invalid request'
                }
            )
    
        uploaded_file = request.FILES['file']
        file_repo = FileRepository()

        try:
            file_name, file_path = file_repo.save_file(uploaded_file)
            protected_attributes = ['sender_gender', 'sender_race']
            true_df, pred_df = self.convert_file_interactor.convert(file_path, protected_attributes)
            results = self.calculate_metrics_interactor.calculate(true_df, pred_df, protected_attributes)

            if os.path.exists(file_path):
                os.remove(file_path)

            return Response({
                "file_name": file_name,
                "file_path": file_path,
                "overview": {
                    "score": results["bias_score"],
                    "top_category": "ABC",
                },
                "metric_results": results["formatted_metrics"],
            })

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})