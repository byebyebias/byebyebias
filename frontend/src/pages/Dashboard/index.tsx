import { 
    Typography,
    Stack,
    Box
 } from "@mui/material"
import Overview from "../../components/dashboard-components/Overview/Overview"
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid"
import BiasScore from "../../components/dashboard-components/BiasScore/BiasScore"
import { dataScore, dataOverview, dataGraphs, dataset_name } from "./data"

function DashboardPage() { 

    return (
        <Stack>
            <Typography variant="body2" pb={3}>{dataset_name}</Typography>

            <Box bgcolor="#E6EEF5" p={10}>
                <Stack direction="row" spacing={5}>
                    <BiasScore score={dataScore}/>
                    <Overview data={dataOverview}/>
                </Stack>
                <GraphGrid graphsInfo={dataGraphs}/>

            </Box>

        </Stack>
    )
}

export default DashboardPage