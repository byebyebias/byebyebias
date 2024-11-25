import Grid from "@mui/material/Grid2";
import { Container, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colorSchemes } from '@nivo/colors';
import BarChart from "../BarChart/BarChart";

function Graph({data, title}) {
    return (
        <Card component="div" aria-label={`This graph displays the ${title} metric for each of your selected attributes`} tabIndex={0} sx={{ border: '0.5px solid #000000', width: "30%", borderRadius: '35px', background: "#F8FEFA", alignItems: 'center'}} >
            <Typography style= {{textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontFamily: 'Montserrat', fontSize:'20px', fontWeight: 400, fontStyle: 'italic'}}>{title}</Typography>
            <CardContent sx={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <BarChart data={data} />
            </CardContent>
        </Card>
    )
}


function GraphGrid({graphsInfo}) {

    if (!graphsInfo || !Array.isArray(graphsInfo)) {
        return <p>No data available</p>; 
    }
    
    return (
    <Container style={{display: 'flex', justifyContent:"center", maxWidth:"none"}}>
        <Grid container rowSpacing={8} columnSpacing={6} pt={4}>
            {graphsInfo.map( (graphInfo: { values: any; title: any; }) => 
                <Graph data={graphInfo.values} title={graphInfo.title}/>
               
            )}

        </Grid>
    </Container>
    )    
}

export default GraphGrid