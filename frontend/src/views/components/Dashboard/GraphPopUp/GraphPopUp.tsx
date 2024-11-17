import { BarChart } from "@mui/icons-material";
import { Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function GraphPopUp({title, data, open, handleClose}) {


    return (
        <Modal open={open} onClose={handleClose}>
            <Box 
                p={6} aria-label={`This is the enlarged version of the ${title} graph`} tabIndex={0} 
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
                    <Card p={6} tabIndex={0} sx={{width: "90%", borderRadius: '35px', backgroundColor: '#F8FEFA',}} >
                        <CardContent sx={{display:'flex'}}>
                            <BarChart data={data} height="600px" width="50%" />
                            <IconButton aria-label="close popup" sx={{position: 'absolute', zIndex: 1, top:30, right: 100}}>
                                <CloseIcon/>
                            </IconButton>
                        </CardContent>
                        
                    </Card>
                    
            </Box>
        </Modal>
    )
}

export default GraphPopUp;