import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"


function LetterGrade( { data } ) {
    //TODO add improvement areas dynamically

    return (
        <Card sx={{ borderRadius: '35px 0px 0px 35px', width: '40%', background: '#F8FEFA', border: '0.5px solid #000000', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            
            <CardContent>
                <Typography variant="h4" sx= {{paddingLeft: '20px', paddingTop: '10px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '40px', color: '#28282C'}}>Your bias score:</Typography>

                <Card sx = {{ width: '164px', height: '141px', background: '#DAC134', borderRadius: '20px'}}>

                    <CardContent>
                        <Typography sx={{fontFamily: 'Montserrat', fontWeight: 700, fontSize: '90px', lineHeight: '110px', color:'#F8FEFA'}}>{data.bias_score}</Typography>

                    </CardContent>
                </Card>
            
            </CardContent>

        </Card>

    )
}


export default LetterGrade