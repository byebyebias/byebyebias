import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"


function Overview() {
    return (
        <Card variant="outlined">

            <CardContent>
                <Typography variant="h4">Overview</Typography>

                <Typography variant="body1">Your bias score is C+! This places you in the top 50% of users.</Typography>

                <Typography variant="body1">Your top category is ABC. Areas for improvement include ABC and ABC</Typography>
            </CardContent>
        </Card>
    )
}

export default Overview