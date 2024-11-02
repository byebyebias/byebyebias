import { 
    Typography,
    Stack,
 } from "@mui/material"
import { useEffect } from "react"
import Overview from "../../components/dashboard-components/Overview/Overview"

const data = {
    bias_score: "C+",
    top_percentile: 50,
    top_category: "ABC",
    improvement_area: "BCD",
}

function DashboardPage() { 

    return (
        <Stack sx={{p:20}}>
            <Typography variant="h3">Dashboard</Typography>
            <Overview/>
            

        </Stack>
    )
}

export default DashboardPage