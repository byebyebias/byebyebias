class BiasReport:
    def __init__(self, file_name, score, top_category, metric_results):
        self.file_name = file_name
        self.score = score
        self.top_category = top_category
        self.metric_results = metric_results
        
    # TODO: Create getters for all these attributes
    # TODO: consider creating a Metric entity which would store a name and a value for the metric