import pandas
import warnings
from backend.core.use_cases.interfaces import FileConverter

warnings.filterwarnings("ignore", category=UserWarning) # Suppress PyTorch warnings

class ImplFileConverter(FileConverter):
    
    def __init__(self, file, protected_attributes: list[str]):
        self.df = pandas.read_parquet(file)
        self.protected_attributes = protected_attributes
        self.privileged_groups = {}
        self.clean_dataset()

    def clean_dataset(self):
        for protected_attribute in self.protected_attributes:
            # encode the protected attribute column as binary
            priv_group = self.find_priv(protected_attribute)
            self.privileged_groups[protected_attribute] = priv_group

            groups = set(self.df[protected_attribute])
            group_map = {group: 0 for group in groups if group != priv_group}
            group_map[priv_group] = 1
            self.df[protected_attribute] = self.df[protected_attribute].map(group_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in self.protected_attributes + ['is_fraud', 'predicted_fraud']])
        self.df = self.df.dropna()
    
    def get_df(self):
        return self.df
    
    def get_true_df(self):
        df = self.df.drop(columns=['predicted_fraud'])
        return df
    
    def get_pred_df(self):
        df = self.df.drop(columns=['is_fraud'])
        return df
    
    def find_priv(self, column: str):
        # column in table, eg. sender_gender, sender_race 
        # finds the group with the most number of FPs
        fp_count = self.df[(self.df['is_fraud'] == 0) & (self.df['predicted_fraud'] == 1)].groupby(column).size().sort_values(ascending=True)

        # outlier if top two rows are equal or 0
        if fp_count.index[0] == fp_count.index[1]:
            # break tie with false negative comparison
            fn_count = self.df[(self.df['is_fraud'] == 1) & (self.df['predicted_fraud'] == 0)].groupby(column).size().sort_values(ascending=True)
            return fn_count.index[0]
        
        return fp_count.index[0]
    
    def get_privileged_groups(self):
        return self.privileged_groups
        
