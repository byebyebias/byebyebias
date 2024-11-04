import { 
    Typography,
    Stack,
 } from "@mui/material"
import Overview from "../../components/dashboard-components/Overview/Overview"
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid"
import { dataOverview, dataGraphs, dataset_name } from "./data"

function DashboardPage() { 

    return (
        <Stack p={20}>
            <Typography variant="body2" pb={3}>{dataset_name}</Typography>
            <Typography variant="h3" pb={3}>Dashboard</Typography>
            <Overview data={dataOverview}/>
            <GraphGrid graphsInfo={dataGraphs}/>

        </Stack>
    )
}

export default DashboardPage