import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"

 interface OverviewProps {
    data: {
      top_category: string;
    };
  }

function Overview( { data }: OverviewProps) {
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