import { Typography, Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import GraphGrid from "../components/Dashboard/GraphGrid/GraphGrid";
import Overview from "../components/Dashboard/Overview/Overview";
import LetterGrade from "../components/Dashboard/LetterGrade/LetterGrade";
import Footer from "../components/Footer/Footer";

function DashboardPage() {
  const location = useLocation();
  const { dashboardData } = location.state;

  return (
    <><Stack sx={{backgroundColor: '#E6EEF5'}}>
      <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}} variant="body2" pb={3}>
        {dashboardData.filePath}
      </Typography>

      <Box bgcolor="#E6EEF5" p={10}>
        <Stack direction="row" spacing={2}>
          <Typography sx={{fontFamily: 'Montserrat', fontSize:'15px', fontWeight: 300, color:"#9921D2"}}>{dashboardData.fileName}</Typography>
          <LetterGrade score={dashboardData.overview?.score || "A+"} />
          <Overview data={dashboardData.overview || { score: 0, top_category: 'Sender_Gender' }} />
        </Stack>
        <GraphGrid graphsInfo={dashboardData.metricResults} />
      </Box>
    </Stack>
    <Footer label="© 2024 Team TripleB" /></>
  );
}

export default DashboardPage;
