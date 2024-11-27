import { Container, Card, Grid2, CardContent, Typography, Modal, Box, IconButton } from "@mui/material";
import {Graph} from "../Graph/Graph";

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
        <Box sx={{paddingLeft: '20px', paddingTop: '40px', gap:4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
            {graphsInfo.map( (graphInfo: { values: any; title: any; }) => 
                <Graph key={graphInfo.title} values={graphInfo.values} title={graphInfo.title} />
            )}
        </Box>
    );    
};

export default GraphGrid;