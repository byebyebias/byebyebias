import { 
    Typography,
    Stack,
 } from "@mui/material"
import { useLocation } from 'react-router-dom';
import Overview from "../../components/dashboard-components/Overview/Overview"
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid"
// import { dataOverview, dataGraphs, dataset_name } from "./data"

function DashboardPage() { 
    const location = useLocation();
    const { dashboardData } = location.state

    return (
        <Stack p={20}>
            <Typography variant="body2" pb={3}>{dashboardData.file_name}</Typography>
            <Typography variant="h3" pb={3}>Dashboard</Typography>
            <Overview data={dashboardData.overview}/>
            <GraphGrid graphsInfo={dashboardData.metric_results}/>

        </Stack>
    )
}

export default DashboardPage