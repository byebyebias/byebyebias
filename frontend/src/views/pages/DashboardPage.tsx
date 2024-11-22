import { Typography, Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Overview from "../components/Dashboard/Overview/Overview";
import GraphGrid from "../components/Dashboard/GraphGrid/GraphGrid";
import BiasScore from "../components/Dashboard/BiasScore/BiasScore";

function DashboardPage() {
  const location = useLocation();
  const { dashboardData } = location.state;
  console.log("Metric Results:", dashboardData.metricResults);

  return (
    <Stack>
      <Typography variant="body2" pb={3}>
        {dashboardData.filePath}
      </Typography>

      <Box bgcolor="#E6EEF5" p={10}>
        <Stack direction="row" spacing={5}>
          <BiasScore score={dashboardData.overview.score} />
          <Overview data={dashboardData.overview} />
        </Stack>
        <GraphGrid graphsInfo={dashboardData.metricResults} />
      </Box>
    </Stack>
  );
}

export default DashboardPage;
