import Grid from "@mui/material/Grid2";
import { Container, Card, CardContent, CardHeader } from "@mui/material";
import BarChart from "../BarChart/BarChart";

function Graph({data, title}) {
    return (
        <Card p={3} style={{ width: "325px" }}>
            <CardHeader title={title}/>
            <CardContent>
                <BarChart data={data}/>
            </CardContent>
        </Card>
    )
}


function GraphGrid({graphsInfo}) {
        return (
        <Container style={{display: 'flex', justifyContent:"center", maxWidth:"none"}}>
            <Grid container rowSpacing={8} columnSpacing={8} pt={8}>
                {graphsInfo.map( (graphInfo) => 
                    <Graph data={graphInfo.values} title={graphInfo.title}/>
                )}

            </Grid>
        </Container>
    )    
}

export default GraphGrid