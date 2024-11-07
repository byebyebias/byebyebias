import { Typography, Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Overview from "../../components/dashboard-components/Overview/Overview";
import GraphGrid from "../../components/dashboard-components/GraphGrid/GraphGrid";
import BiasScore from "../../components/dashboard-components/BiasScore/BiasScore";

function DashboardPage() {
  const location = useLocation();
  const { dashboardData } = location.state;

  return (
    <Stack>
      <Typography variant="body2" pb={3}>
        {dashboardData.file_path}
      </Typography>

      <Box bgcolor="#E6EEF5" p={10}>
        <Stack direction="row" spacing={5}>
          <BiasScore score={dashboardData.overview.score} />
          <Overview data={dashboardData.overview} />
        </Stack>
        <GraphGrid graphsInfo={dashboardData.metric_results} />
      </Box>
    </Stack>
  );
}

export default DashboardPage;
