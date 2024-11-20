import { Modal, Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import BarChart from "../BarChart/BarChart";
  
type GraphPopUpProps = {
    title: string;
    data: any;
    open: boolean; 
    handleClose: (...args: any[]) => any;
}

function GraphPopUp({title, data, open, handleClose, }: GraphPopUpProps) {

    return (
        <Modal aria-label="Popup with enlarged ${title} graph" open={open} onClose={handleClose}>
            <Box 
                
                p={6} tabIndex={0} 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    padding: '10px',
                    borderRadius: '35px',
                }}>
                    <Typography style= {{textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontFamily: 'Montserrat', fontSize:'20px', fontWeight: 400, fontStyle: 'italic'}}>{title}</Typography>
                    <Card tabIndex={0} sx={{width: "90%", borderRadius: '35px', backgroundColor: '#F8FEFA'}} >
                        <CardContent sx={{display:'flex'}}>
                            <BarChart data={data} height="400px" width="50%" />
                            <IconButton component="div" tabIndex={0} aria-label="Close popup" sx={{position: 'absolute', zIndex: 1, top:30, right: 100}}>
                                <CloseIcon/>
                            </IconButton>
                        </CardContent>
                    </Card>
                    
            </Box>
        </Modal>
    )
}

export default GraphPopUp;