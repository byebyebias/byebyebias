import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"


function Overview( { data } ) {
    //TODO add improvement areas dynamically

    return (
        <Card sx= {{width: '55%', background: '#F8FEFA', border: '0.5px solid #000000', boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '0px 35px 35px 0px'}}>

            <CardContent>
                <Typography sx= {{paddingLeft: '20px',textAlign: 'left', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 700, fontSize: '40px', color: '#28282C'}}>Overview</Typography>

                <Typography sx= {{paddingLeft: '20px', textAlign: 'left', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 400, fontSize: '35px', color: '#28282C'}}>Your top category is {data.top_category}. Areas for improvement include ABC and BCD</Typography>
            </CardContent>
        </Card>
    )
}

export default Overview







