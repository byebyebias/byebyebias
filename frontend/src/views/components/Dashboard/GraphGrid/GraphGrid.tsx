import { Container, Card, Grid2, CardContent, Typography, Modal, Box, IconButton } from "@mui/material";
import Graph from "../Graph/Graph";

console.log("hi" + {Graph}); 

interface GraphGridProps {
  graphsInfo: { 
    title: string; 
    values: { 
      protected_attribute: string; 
      score: number; 
    }[]; 
  }[];
};

const GraphGrid: React.FC<GraphGridProps> = ({ graphsInfo }) => {
    const descriptors: { [key: string]: string } = {
      'Disparate Impact': 'Shows the ratio of outcomes for different groups, highlighting potential bias in decision-making processes.',
      'Statistical Parity Difference': 'Measures the difference in selection rates between groups to assess fairness.',
      'Average Odds Difference': 'Compares the true positive and false positive rates between groups to evaluate model consistency.',
      'Equal Opportunity Difference': 'Focuses on the difference in true positive rates to ensure equitable opportunities across groups.',
    };
  
    if (!graphsInfo || !Array.isArray(graphsInfo)) {
        return <p>No data available</p>; 
    }
    
    return (
    <Container style={{display: 'flex', justifyContent:"center", maxWidth:"none"}}>
        <Grid2 container rowSpacing={8} columnSpacing={6} pt={4}>
            {graphsInfo.map( (graphInfo: { values: any; title: any; }) => 
                <Graph key={graphInfo.title} values={graphInfo.values} title={graphInfo.title} />
            )}

        </Grid2>
    </Container>
    );    
};

export default GraphGrid;
