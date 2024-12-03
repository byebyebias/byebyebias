from abc import abstractmethod
from typing import Any

class BiasMetrics():
    @abstractmethod
    def get_all_bias_metrics(self) -> Any:
        pass
    
    @abstractmethod
    def get_score(self) -> tuple[str, float]:
        pass

    @abstractmethod
    def get_accuracy(self) -> float:
        pass


class FileConverter():
    
    @abstractmethod
    def clean_dataset(self):
        pass
        
    @abstractmethod
    def get_df(self):
        pass

    @abstractmethod
    def get_true_df(self):
        pass
        
    @abstractmethod
    def get_pred_df(self):
        pass
        
    @abstractmethod
    def find_priv(self, column: str):
        pass
    
    @abstractmethod
    def get_privileged_groups(self):
        pass
        

class FileRepository():
    @abstractmethod
    def save_file(self) -> Any:
        pass
    