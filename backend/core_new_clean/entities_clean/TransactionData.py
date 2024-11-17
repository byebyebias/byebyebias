import pandas as pd

class TransactionData():
    '''
    Stores information about a pandas dataframe of transaction data to be analyzed for bias
    '''

    def __init__(self, true_df: pd.DataFrame, pred_df: pd.DataFrame, protected_attributes: list[str]):
        self.true_df = true_df
        self.pred_df = pred_df
        self.protected_attributes = protected_attributes