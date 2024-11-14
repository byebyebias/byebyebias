import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function BiasScore({score}) {
    return (
        <Card  sx={{flex: "1"}}>
            <CardHeader title="Your Fairness Score"/>
            <CardContent>
                <Typography variant="h1">{score}</Typography>
            </CardContent>
        </Card>
    )
} 

export default BiasScore