import { Button } from "@mui/material";
import GraphGrid from "../GraphGrid/GraphGrid";
import BarChart from "../BarChart/BarChart";

function ViewGraphButton ({onClick}) {

    return (<Button onClick={onClick} sx={{width: 60, height: 60, borderRadius:'50%'}}variant="contained" color="primary">hi</Button>)
    
}
export default ViewGraphButton;