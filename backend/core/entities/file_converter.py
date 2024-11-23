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
        priv_gender = self.find_priv( "sender_gender")
        priv_race = self.find_priv("sender_race")

        # encode the 'race' column as binary 
        races = set(self.df['receiver_race']).union(set(self.df['sender_race']))
        race_map = {race: 0 for race in races if race != priv_race}
        race_map[priv_race] = 1
        # print(race_map)
        self.df['receiver_race'] = self.df['receiver_race'].map(race_map)
        self.df['sender_race'] = self.df['sender_race'].map(race_map)

        # encode the 'gender' column
        genders = set(self.df['receiver_gender']).union(set(self.df['sender_gender']))
        gender_map = {gender: 0 for gender in genders if gender != priv_gender}
        gender_map[priv_gender] = 1
        self.df['receiver_gender'] = self.df['receiver_gender'].map(gender_map)
        self.df['sender_gender'] = self.df['sender_gender'].map(gender_map)

        print(self.df['sender_gender'])
        print(self.df['sender_race'])

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

        # if more than one group has zero false positives

        return fp_count.index[0]
        