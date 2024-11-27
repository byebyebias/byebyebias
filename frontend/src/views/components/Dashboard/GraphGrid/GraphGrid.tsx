import { Container, Card, CardContent, CardHeader, Typography, Grid2 } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colorSchemes } from '@nivo/colors';
import BarChart from "../BarChart/BarChart";
import InfoButton from "../InfoButton/InfoButton"; // Import the InfoButton component


function Graph({data, title, desc}) {
    return (
        <Card component="div" aria-label={`This graph displays the ${title} metric for each of your selected attributes`} tabIndex={0} sx={{ position: 'relative', border: '0.5px solid #000000',width: "390px", borderRadius: '35px', background: "#F8FEFA", alignItems: 'center'}} >
            <Typography variant="h3" style= {{textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontFamily: 'Montserrat', fontSize:'20px', fontWeight: 400, fontStyle: 'italic'}}>{title}</Typography>
            <div style={{zIndex: 10, position: 'absolute', top: "325px", right: "5px"}}><InfoButton description={desc} /></div>

            <CardContent sx={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <BarChart data={data} />
            </CardContent>
        </Card>
    )
}

interface GraphGridProps {
    graphsInfo: { title: string; values: number[] }[];
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
          <Grid2 container rowSpacing={5} columnSpacing={5} pt={8}>
            {graphsInfo.map((graphInfo, index) => {
              const graphTitle = graphInfo.title;
              const description = descriptors[graphTitle] || 'No description available';
    
              return (
                <Grid2 item key={index}>

                  <Graph data={graphInfo.values} title={graphTitle} desc={description}/>

                </Grid2>
              );
            })}
          </Grid2>
        </Container>
      );
};



export default GraphGrid