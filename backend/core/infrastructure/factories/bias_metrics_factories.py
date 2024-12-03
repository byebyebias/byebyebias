import pandas as pd
from backend.core.adapters.impl_bias_metrics import ImplBiasMetrics

from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from backend.core.use_cases.interfaces import BiasMetrics
from backend.core.use_cases.upload_file_interactor import UploadFileInteractor
from backend.core.use_cases.process_link_interactor import ProcessLinkInteractor

from backend.core.data_access.file_repository import FileRepository

from backend.core.interface.controllers.bias_metrics_controller import BiasMetricsController


class FileRepositoryFactory:

    @staticmethod
    def get() -> FileRepository:
        return FileRepository()


class UploadFileInteractorFactory:

    @staticmethod
    def get() -> UploadFileInteractor:
        file_repository = FileRepositoryFactory.get()
        return UploadFileInteractor(file_repository)
    
class ProcessLinkInteractorFactory:

    @staticmethod
    def get() -> ProcessLinkInteractor:
        file_repository = FileRepositoryFactory.get()
        return ProcessLinkInteractor(file_repository)

class ConvertFileInteractorFactory:

    @staticmethod
    def get() -> ConvertFileInteractor:
        return ConvertFileInteractor()


class CalculateMetricsInteractorFactory:

    @staticmethod
    def get() -> CalculateMetricsInteractor:
        return CalculateMetricsInteractor()


class BiasMetricsViewSetFactory:

    @staticmethod
    def create() -> BiasMetricsController:
        calculate_metrics_interactor = CalculateMetricsInteractorFactory.get()
        convert_file_interactor = ConvertFileInteractorFactory.get()
        upload_file_interactor = UploadFileInteractorFactory.get()
        process_link_interactor = ProcessLinkInteractorFactory.get()

        return BiasMetricsController(
            calculate_metrics_interactor, 
            convert_file_interactor, 
            upload_file_interactor,
            process_link_interactor
        )

class BiasMetricsFactory:

    @staticmethod
    def create(df: pd.DataFrame, true_df: pd.DataFrame, pred_df: pd.DataFrame, protected_attributes: list[str]) -> BiasMetrics:
        return ImplBiasMetrics(df, true_df, pred_df, protected_attributes)
    
