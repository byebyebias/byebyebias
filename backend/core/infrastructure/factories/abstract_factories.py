import pandas as pd
from backend.core.adapters.impl_bias_metrics import ImplBiasMetrics
from backend.core.adapters.impl_file_converter import ImplFileConverter
from backend.core.data_access.LocalFileRepo import LocalFileRepo
from backend.core.data_access.S3FileRepo import S3FileRepo
from backend.core.use_cases.interfaces import BiasMetrics, FileConverter, FileRepository


class FileRepositoryFactory:

    @staticmethod
    def get_local_file() -> FileRepository:
        return LocalFileRepo()
    
    @staticmethod
    def get_s3_file() -> FileRepository:
        return S3FileRepo()
    
    
class BiasMetricsFactory:

    @staticmethod
    def create(df: pd.DataFrame, true_df: pd.DataFrame, pred_df: pd.DataFrame, protected_attributes: list[str]) -> BiasMetrics:
        return ImplBiasMetrics(df, true_df, pred_df, protected_attributes)
    
class FileConverterFactory:

    @staticmethod
    def create(file, protected_attributes: list[str]) -> FileConverter:
        return ImplFileConverter(file, protected_attributes)
    