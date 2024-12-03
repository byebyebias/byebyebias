import pandas as pd

from backend.core.infrastructure.factories.abstract_factories import FileRepositoryFactory
from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from backend.core.use_cases.upload_file_interactor import UploadFileInteractor
from backend.core.use_cases.process_link_interactor import ProcessLinkInteractor

from backend.core.interface.controllers.bias_metrics_controller import BiasMetricsController


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
    def __init__(self, 
                 calculate_metrics: CalculateMetricsInteractor, 
                 convert_file_interactor: ConvertFileInteractor, 
                 upload_file_interactor: UploadFileInteractor, 
                 process_link_interactor: ProcessLinkInteractor):
        # Initialize the factory with the provided interactors
        self.calculate_metrics = calculate_metrics
        self.convert_file_interactor = convert_file_interactor
        self.upload_file_interactor = upload_file_interactor
        self.process_link_interactor = process_link_interactor

    def create(self) -> BiasMetricsController:
        # Use the interactors passed to the constructor to create the controller
        return BiasMetricsController(
            self.calculate_metrics,
            self.convert_file_interactor,
            self.upload_file_interactor,
            self.process_link_interactor
        )


