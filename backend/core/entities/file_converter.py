import pandas
import warnings

warnings.filterwarnings("ignore", category=UserWarning) # Suppress PyTorch warnings

class FileConverter:
    
    def __init__(self, file, protected_attributes: list[str]):
        self.df = pandas.read_parquet(file)
        self.protected_attributes = protected_attributes
        self.clean_dataset()

    # refactor clean_dataset to use protected_attributes to clean dataset
    def clean_dataset(self):
        priv_sender_gender = self.find_priv("sender_gender")
        priv_sender_race = self.find_priv("sender_race")
        priv_receiver_gender = self.find_priv("receiver_gender")
        priv_receiver_race = self.find_priv("receiver_race")

        # encode the 'race' columns as binary 
        races = set(self.df['receiver_race']).union(set(self.df['sender_race']))
        sender_race_map = {race: 0 for race in races if race != priv_sender_race}
        sender_race_map[priv_sender_race] = 1

        receiver_race_map = {race: 0 for race in races if race != priv_receiver_race}
        receiver_race_map[priv_receiver_race] = 1

        # print(race_map)
        self.df['receiver_race'] = self.df['receiver_race'].map(receiver_race_map)
        self.df['sender_race'] = self.df['sender_race'].map(sender_race_map)

        # encode the 'gender' column
        genders = set(self.df['receiver_gender']).union(set(self.df['sender_gender']))
        sender_gender_map = {gender: 0 for gender in genders if gender != priv_sender_gender}
        sender_gender_map[priv_sender_gender] = 1
        receiver_gender_map = {gender: 0 for gender in genders if gender != priv_receiver_gender}
        receiver_gender_map[priv_receiver_gender] = 1
        self.df['receiver_gender'] = self.df['receiver_gender'].map(receiver_gender_map)
        self.df['sender_gender'] = self.df['sender_gender'].map(sender_gender_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in ['sender_gender', 'receiver_gender', 'sender_race', 'receiver_race', 'is_fraud', 'predicted_fraud']])

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
        