import { 
    CardContent,
    Typography,
    Card,
    Link,
 } from "@mui/material"

 interface OverviewProps {
    data: {
      top_category: string;
    };
  }

function Overview( { data }: OverviewProps) {
    return (
        <Card sx= {{width: '65%', background: '#F8FEFA', border: '0.5px solid #000000', boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '0px 35px 35px 0px'}}>

            <CardContent sx={{flexDirection: 'column', display: 'flex'}}>
                <Typography variant="h2" sx= {{paddingLeft: '25px', paddingTop: '10px', paddingBottom: '10px', textAlign: 'left', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 700, fontSize: '40px', color: '#28282C'}}>Overview</Typography>

                <Typography variant="body2" sx= {{paddingLeft: '25px', textAlign: 'left', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 200, fontSize: '27px', color: '#28282C'}}>Your top category is {data.top_category}. Areas for improvement include ABC and BCD</Typography>

            </CardContent>
        </Card>
    )

}

export default Overview