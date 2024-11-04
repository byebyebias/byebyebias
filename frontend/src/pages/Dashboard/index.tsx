import { 
    Typography,
    Stack,
 } from "@mui/material"
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid"
import Overview from "../../components/dashboard-components/Overview/Overview"
import LetterGrade from "../../components/dashboard-components/LetterGrade/LetterGrade"

import { dataOverview, dataGraphs, dataset_name } from "./data"

function DashboardPage() { 

    return (
        <Stack p={10} sx={{backgroundColor: '#E6EEF5'}}>
            <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}} variant="body2" pb={3}>{dataset_name}</Typography>
            
            <Stack direction="row" spacing={3} pb={3}>
                <LetterGrade data={dataOverview} />
                <Overview data={dataOverview} />
            </Stack>

            <GraphGrid graphsInfo={dataGraphs}/>

        </Stack>
    )
}

export default DashboardPage