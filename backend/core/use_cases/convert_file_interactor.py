from backend.core.entities.file_converter import FileConverter

class ConvertFileInteractor:
    def convert(self, file_path, protected_attributes):
        file_converter = FileConverter(file_path, protected_attributes)

        return (file_converter.get_true_df(), file_converter.get_pred_df())
