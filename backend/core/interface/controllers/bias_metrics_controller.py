from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from backend.core.use_cases.upload_file_interactor import UploadFileInteractor

from http import HTTPStatus

import os
from rest_framework.response import Response

class BiasMetricsController:
    def __init__(self, 
                 calculate_metrics_interactor: CalculateMetricsInteractor, 
                 convert_file_interactor: ConvertFileInteractor,
                 upload_file_interactor: UploadFileInteractor
                ):
        self.calculate_metrics_interactor = calculate_metrics_interactor
        self.convert_file_interactor = convert_file_interactor
        self.upload_file_interactor = upload_file_interactor

    def get_bias_metrics(self, request_files, protected_attributes):
        if 'file' not in request_files:
            return {'message': 'No file provided or invalid request'}, HTTPStatus.BAD_REQUEST.value
    

        uploaded_file = request_files['file']

        try:
            file_name, file_path = self.upload_file_interactor.post(uploaded_file)
            true_df, pred_df, df, privileged_groups = self.convert_file_interactor.convert(file_path, protected_attributes)
            results = self.calculate_metrics_interactor.calculate(df, true_df, pred_df, protected_attributes)

            if os.path.exists(file_path):
                os.remove(file_path)

            data = {
                "file_name": file_name,
                "file_path": file_path,
                "overview": {
                    "score": results["letter_grade"],
                    "percentage": results["bias_score"],
                    "privileged_groups": privileged_groups,
                    "accuracy": results["accuracy"]
                },
                "metric_results": results["formatted_metrics"],
            }

            return data, HTTPStatus.OK.value

        except Exception as e:
            return {'message': str(e)}, HTTPStatus.BAD_REQUEST.value