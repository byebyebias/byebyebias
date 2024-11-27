import { 
    CardContent,
    Typography,
    Card,
} from "@mui/material"

import LetterBackgroundColour from "./LetterBackgroundColour"

interface LetterGradeProps extends React.HTMLAttributes<HTMLDivElement> {
    score: string;
    percentage: number; 
}

function LetterGrade( { score, percentage }: LetterGradeProps ) {
    const { backgroundColour, textColour } = LetterBackgroundColour({ score, percentage })

    return (
        <Card sx={{ paddingLeft: '20px', borderRadius: '35px 0px 0px 35px', width: '35%', background: '#F8FEFA', border: '0.5px solid #000000', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>

            <CardContent>
                <Typography variant="h2" sx= {{paddingBottom: '10px', textAlign: 'left', paddingTop: '10px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '40px', color: '#28282C'}}>Fairness score:</Typography>

                <Card sx = {{width: '145px', height: '130px', background: backgroundColour, borderRadius: '20px'}}>

                    <CardContent sx={{justifyContent: 'center'}}>
                        <Typography aria-label={`${score}`} sx={{ textAlign: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '83px', lineHeight: '110px', color: textColour}}>{score}</Typography>

                    </CardContent>
                </Card>

            </CardContent>

        </Card>

    )
}


export default LetterGrade;