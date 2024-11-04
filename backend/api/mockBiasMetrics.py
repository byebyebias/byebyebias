class BiasMetrics():
    def __init__(self, true_df, pred_df, protected_attributes):
        d = 1

    def get_score(self):
        return "A+"
    
    def get_all_bias_metrics(self):
        return {
        "Statistical Parity Difference":
            { 
                "sender_gender": 50,
                "sender_race": 100
            },

        "Average Odds Difference":
            { 
                "sender_gender": 75,
                "sender_race": 50
            },
        "Disparate Impact":
            { 
                "sender_gender": 50,
                "sender_race": 100
            }
            ,
        "Equalized Opportunities":
            { 
                "sender_gender": 100,
                "sender_race": 75
            }
    }             