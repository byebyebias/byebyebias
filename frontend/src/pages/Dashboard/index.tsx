import { 
    Typography,
    Stack,
 } from "@mui/material"

import Overview from "../../components/dashboard-components/Overview/Overview"


function DashboardPage() {
    return (
        <Stack>
            <Typography variant="h1">Dashboard</Typography>
            <Overview/>
        </Stack>
    )
}

export default DashboardPage