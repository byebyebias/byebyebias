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
    <>
    <Stack>
      <Typography tabIndex={0} aria-label={`File path displayed as ${dashboardData.filePath.split('/').pop()}`} p={14} sx={{textAlign:'left', fontFamily: 'Montserrat', color: "#9921D2", fontWeight: 500, fontSize: '15pt'}} pb={3}>
        {dashboardData.filePath.split('/').pop()}
      </Typography>

      <Stack sx={{backgroundColor: '#E6EEF5'}}>
      
      <Box bgcolor="#E6EEF5" p={6}>
        <Stack direction="row" spacing={2}>
          <Typography sx={{fontFamily: 'Montserrat', fontSize:'15px', fontWeight: 300, color:"#9921D2"}}>{dashboardData.fileName}</Typography>
          <LetterGrade tabIndex={0} aria-label={`Letter grade is ${dashboardData.overview?.score || "A+"}`} score={dashboardData.overview?.score || "A+"} />
          <Overview data={dashboardData.overview || { score: 0, top_category: 'Sender_Gender' }} />
        </Stack>
        <GraphGrid graphsInfo={dashboardData.metricResults} />
      </Box>
    </Stack>

    </Stack>
    
    <Footer label="© 2024 Team TripleB" /></>
  );
}

export default DashboardPage;
