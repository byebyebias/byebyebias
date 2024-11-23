import { Card, CardContent, CardHeader, Typography } from "@mui/material";

interface BiasScoreProps {
    score: number;
}

function BiasScore({ score }: BiasScoreProps) {
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