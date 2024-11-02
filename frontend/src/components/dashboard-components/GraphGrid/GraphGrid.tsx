import Grid from "@mui/material/Grid2";
import { Container, Box } from "@mui/material";
import BarChart from "../BarChart/BarChart";


function GraphGrid({graphsInfo}) {
        return (
        <Container style={{display: 'flex', justifyContent:"center", maxWidth:"none"}}>
            <Grid container rowSpacing={8} pt={8}>
                {graphsInfo.map( (graphInfo) => 
                    <Grid style={{ minWidth: "350px" }} >
                        <BarChart data={graphInfo.values} title={graphInfo.title}/>
                    </Grid>
                    
                )}

            </Grid>
        </Container>
    )    
}

export default GraphGrid