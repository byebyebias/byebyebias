import Grid from "@mui/material/Grid2";

/*
Currently just hardcodes the 4 metric graphs
Future TODO might generate graphs based on number of metrics returned from api call
*/

function GraphGrid() {
    return (
        <Grid container spacing={2} columns={{s:1, m:2, lg:4}}>
            <Grid size={1}>
                Hello
            </Grid>
            <Grid size={1}>
                World
            </Grid>
            <Grid size={1}>
                Tis
            </Grid>
            <Grid size={1}>
                Michelle
            </Grid>

        </Grid>
    )    
}

export default GraphGrid