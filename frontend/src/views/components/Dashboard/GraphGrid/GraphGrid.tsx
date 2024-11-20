import Grid from "@mui/material/Grid2";
import { Container, Card, CardContent, Typography, Modal, Box, IconButton } from "@mui/material";
import BarChart from "../BarChart/BarChart";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

type GraphProps = {
    title: string;
    data: any;  
}


function Graph({data, title}: GraphProps) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log('modal has been opened');
    }
        

    const handleClose = () => {
        setOpen(false);
        console.log('modal has been closed');
    }

    return (

        
        <><Card aria-label={`This graph displays the ${title} metric for each of your selected attributes`} tabIndex={0} sx={{ width: "30%", borderRadius: '35px', background: "#F8FEFA", alignItems: 'center'}} >
            
            <CardContent sx={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <BarChart data={data}/>
                <IconButton tabIndex={0} aria-label="enlarge graph" onClick={handleOpen}>
                    <OpenInFullIcon/>
                </IconButton>
            </CardContent>
        </Card>

        <Modal open={open} onClose={handleClose}>
            
            <Box 
            p={6} aria-label={`Enlarged version of the ${title} graph`} tabIndex={0} 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: '90%',
                padding: '10px',
                borderRadius: '35px',
            }}>
                <Card component="div" tabIndex={0} sx={{width: "90%", borderRadius: '35px', backgroundColor: '#F8FEFA',}} >
                    <Typography style= {{textAlign: 'left', paddingLeft: '50px', paddingTop: '30px', fontFamily: 'Montserrat', fontSize:'30px', fontWeight: 400, fontStyle: 'italic'}}>{title}</Typography>

                    <CardContent sx={{display:'flex'}}>
                        <BarChart data={data} height="500px" width="50%" />
                        <IconButton onClick={handleClose} aria-label="close popup" sx={{position: 'absolute', zIndex: 1, top:30, right: 100}}>
                            <CloseIcon/>
                        </IconButton>
                    </CardContent>
                </Card>
                
            </Box>
        </Modal></>

        
    )
}


function GraphGrid({graphsInfo}) {

    if (!graphsInfo || !Array.isArray(graphsInfo)) {
        return <p>No data available</p>; 
    }
    
    return (
    <Container style={{display: 'flex', justifyContent:"center", maxWidth:"none"}}>
        <Grid container rowSpacing={8} columnSpacing={6} pt={4}>
            {graphsInfo.map( (graphInfo: { values: any; title: any; }) => 
                <Graph data={graphInfo.values} title={graphInfo.title}/>
               
            )}

        </Grid>
    </Container>
    )    
}

export default GraphGrid