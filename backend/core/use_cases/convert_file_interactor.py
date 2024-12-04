from backend.core.infrastructure.factories.abstract_factories import FileConverterFactory
from backend.core.adapters.impl_file_converter import ImplFileConverter

class ConvertFileInteractor:
    
    def convert(self, file_path, protected_attributes):
        
        file_converter = FileConverterFactory.create(file_path, protected_attributes)

        return (file_converter.get_true_df(), 
                file_converter.get_pred_df(), 
                file_converter.get_df(), 
                file_converter.get_privileged_groups())
    
