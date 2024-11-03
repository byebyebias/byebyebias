import { 
    Typography,
    Stack,
    Container
 } from "@mui/material"
import Overview from "../../components/dashboard-components/Overview/Overview"
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid"
import BiasScore from "../../components/dashboard-components/BiasScore/BiasScore"
import { dataScore, dataOverview, dataGraphs, dataset_name } from "./data"

function DashboardPage() { 

    return (
        <Stack p={20}>
            <Typography variant="body2" pb={3}>{dataset_name}</Typography>
            <Typography variant="h3" pb={3}>Dashboard</Typography>

            <Stack direction="row" spacing={5}>
                <BiasScore score={dataScore}/>
                <Overview data={dataOverview}/>
            </Stack>

            <GraphGrid graphsInfo={dataGraphs}/>


        </Stack>
    )
}

export default DashboardPage