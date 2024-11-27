import { 
    CardContent,
    Typography,
    Card,
 } from "@mui/material"

import ExportJSONButton from "../ExportJsonButton/ExportJsonButton" 
import styles from "./UploadPage.module.css"

interface OverviewProps {
    data: any;  
    graphsInfo: { title: string; values: number[] }[];  
  }
  
  function Overview({ data, graphsInfo }: OverviewProps) {

    return (
        <Card variant="outlined"  sx={{flex: "2"}}>

            <CardContent>
                <Typography variant="h4">Overview</Typography>
                <Typography variant="body1">Your top category is {data.top_category}. </Typography>
                
                <ExportJSONButton data={data} graphsInfo={graphsInfo} />
            </CardContent>
        </Card>
    )
}

export default Overview