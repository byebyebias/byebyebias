import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"


function Overview( { data } ) {
    //TODO add improvement areas dynamically

    return (
        <Card variant="outlined">

            <CardContent>
                <Typography variant="h4">Overview</Typography>

                <Typography variant="body1">Your bias score is {data.bias_score}! This places you in the top {data.top_percentile}% of users.</Typography>

                <Typography variant="body1">Your top category is {data.top_category}. Areas for improvement include ABC and BCD</Typography>
            </CardContent>
        </Card>
    )
}

export default Overview