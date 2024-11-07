import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"


function Overview( { data } ) {
    //TODO add improvement areas dynamically

    return (
        <Card variant="outlined"  sx={{flex: "2"}}>

            <CardContent>
                <Typography variant="h4">Overview</Typography>

                <Typography variant="body1">Your top category is {data.top_category}. </Typography>
            </CardContent>
        </Card>
    )
}

export default Overview