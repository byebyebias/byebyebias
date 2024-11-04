const dataOverview = {
    bias_score: "C+",
    top_percentile: 50,
    top_category: "ABC",
    improvement_areas: ["BCD", "CDE"],
}

const dataset_name = "your_dataset.csv"


const dataGraphs = [
    {
        title: "Statistical Parity Difference",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },
    {
        title: "Average Odds Difference",
        values: [

            {
            "protected_attribute": "Gender",
            "score": -1,
            },
            {
                "protected_attribute": "Race",
                "score": -3,
            },
            {
                "protected_attribute": "Age",
                "score": -0.5,
            },
        ]
    },
    {
        title: "Equal Odds",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },
    {
        title: "Disparate Impact",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },

]

export { dataOverview, dataGraphs, dataset_name }