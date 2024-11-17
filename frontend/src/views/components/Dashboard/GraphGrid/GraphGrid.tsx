// src/components/Dashboard/GraphGrid/GraphGrid.tsx
import { Container, Grid, Card, CardContent, CardHeader } from "@mui/material";
import BarChart from "../BarChart/BarChart";
import InfoButton from "../InfoButton/InfoButton"; // Import the InfoButton component

interface GraphGridProps {
  graphsInfo: { values: number[] }[]; // Existing structure of graphsInfo
}

const GraphGrid: React.FC<GraphGridProps> = ({ graphsInfo }) => {
  // Define the descriptors for the graphs based on the file path (dashboardData.filePath)
  const descriptors: { [key: string]: string } = {
    'file-path-1': 'This is a description of the first graph based on file-path-1.',
    'file-path-2': 'This graph shows trends related to file-path-2.',
    'file-path-3': 'Graph related to user engagement trends for file-path-3.',
    'file-path-4': 'This graph is focused on performance metrics for file-path-4.',
  };

  return (
    <Container style={{ display: 'flex', justifyContent: "center", maxWidth: "none" }}>
      <Grid container rowSpacing={8} columnSpacing={8} pt={8}>
        {graphsInfo.map((graphInfo, index) => {
          // Get the title from dashboardData.filePath (or any other relevant property)
          const graphTitle = 'file-path-1'; // Use the actual title or graph-specific identifier here.
          const description = descriptors[graphTitle] || 'No description available'; // Get the description based on title

          return (
            <Grid item key={index}>
              <Card style={{ position: "relative", width: "325px" }}>
                <CardHeader title={graphTitle} />
                <CardContent>
                  {/* Add the InfoButton and pass the description based on file path */}
                  <InfoButton description={description} />
                  <BarChart data={graphInfo.values} />
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
