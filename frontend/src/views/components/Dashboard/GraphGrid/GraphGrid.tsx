import { Box } from "@mui/material";
import { Graph } from "../Graph/Graph";

interface GraphGridProps {
  graphsInfo: {
    title: string;
    values: { protected_attribute: string; score: number }[];
  }[];
}

const GraphGrid: React.FC<GraphGridProps> = ({ graphsInfo }) => {
  const descriptors: { [key: string]: string } = {
    "Disparate Impact": `
      The Disparate Impact Ratio (DIR) measures the relative likelihood of favorable outcomes for unprivileged groups compared to privileged groups. 
      For example, if 80% of privileged individuals are approved for a loan but only 60% of unprivileged individuals are approved, the DIR would be 0.75 (60% / 80%). 
      A DIR below 0.8 is often seen as a threshold for potential bias, signaling the need for further investigation into systemic disparities.
    `,
    "Statistical Parity Difference": `
      The Statistical Parity Difference (SPD) calculates the difference in the selection rates for favorable outcomes between unprivileged and privileged groups. 
      For instance, if the selection rate is 70% for privileged individuals and 50% for unprivileged individuals, the SPD would be -0.2 (50% - 70%). 
      A value close to 0 indicates fairness in selection rates, ensuring no group is unfairly advantaged or disadvantaged in decision-making processes.
    `,
    "Average Odds Difference": `
      The Average Odds Difference (AOD) compares the average disparities in true positive rates (TPR) and false positive rates (FPR) across groups. 
      For example, if the TPR is higher for privileged groups, it may mean they are more likely to be accurately identified as positive cases, while unprivileged groups are disproportionately misclassified. 
      Achieving an AOD close to 0 indicates balanced accuracy and error rates between groups, a key factor for fair model performance.
    `,
    "Equal Opportunity Difference": `
      The Equal Opportunity Difference (EOD) focuses on ensuring that true positive rates (TPR) are equal across groups, addressing whether individuals in different groups with actual positive outcomes are equally likely to be correctly identified. 
      For example, in a hiring scenario, EOD checks if qualified candidates from both privileged and unprivileged groups have equal chances of being hired. 
      A value close to 0 means the model offers equitable opportunities, which is especially critical in scenarios like healthcare, hiring, or college admissions.
    `,
  };

  if (!graphsInfo || !Array.isArray(graphsInfo)) {
    return <p>No data available</p>;
  }

  return (
    <Box
      sx={{
        paddingLeft: "20px",
        paddingTop: "40px",
        gap: 4,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {graphsInfo.map((graphInfo) => {
        const { title, values } = graphInfo;

        // Get the static descriptor for the graph title
        const description = descriptors[title] || "No description available.";

        return (
          <Graph
            key={title}
            values={values}
            title={title}
            description={description}
            link="https://www.mathworks.com/help/risk/explore-fairness-metrics-for-credit-scoring-model.html?utm_source=chatgpt.com" // Placeholder for future links if needed
          />
        );
      })}
    </Box>
  );
};

export default GraphGrid;
