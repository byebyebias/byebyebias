import { Container, Grid, Card, CardContent, CardHeader } from "@mui/material";
import BarChart from "../BarChart/BarChart";
import InfoButton from "../InfoButton/InfoButton";

interface GraphGridProps {
  graphsInfo: { 
    title: string; 
    values: { 
      protected_attribute: string; 
      score: number; 
    }[]; 
  }[];
}

const GraphGrid: React.FC<GraphGridProps> = ({ graphsInfo }) => {
  const descriptors: { [key: string]: string } = {
    'Disparate Impact': 'Shows the ratio of outcomes for different groups, highlighting potential bias in decision-making processes.',
    'Statistical Parity Difference': 'Measures the difference in selection rates between groups to assess fairness.',
    'Average Odds Difference': 'Compares the true positive and false positive rates between groups to evaluate model consistency.',
    'Equal Opportunity Difference': 'Focuses on the difference in true positive rates to ensure equitable opportunities across groups.',
  };

  return (
    <Container style={{ display: 'flex', justifyContent: "center", maxWidth: "none" }}>
      <Grid container rowSpacing={8} columnSpacing={8} pt={8}>
        {graphsInfo.map((graphInfo, index) => {
          const graphTitle = graphInfo.title;
          const description = descriptors[graphTitle] || 'No description available';

          const chartData = graphInfo.values.map((item, idx) => ({
            protected_attribute: idx === 0 ? 'sender_gender' : 'sender_race',
            score: item.score,
          }));

          // console.log("Chart Data for", graphTitle, chartData);

          return (
            <Grid item key={index}>
              <Card style={{ position: "relative", width: "400px" }}>
                <CardHeader title={graphTitle} />
                <CardContent>
                  <InfoButton description={description} />
                  <BarChart data={chartData} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GraphGrid;
