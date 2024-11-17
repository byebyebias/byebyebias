import Grid from "@mui/material/Grid2";
import { Container, Card, CardContent, CardHeader } from "@mui/material";
import BarChart from "../BarChart/BarChart";

type BarChartData = {
    label: string;
    value: number;
};

interface GraphProps {
    data: BarChartData[];
    title: string;
}

function Graph({ data, title }: GraphProps) {
    return (
        <Card sx={{ width: 325, p: 3 }}>
            <CardHeader title={title} />
            <CardContent>
                <BarChart data={data} />
            </CardContent>
        </Card>
    );
}

interface GraphInfo {
    title: string;
    values: BarChartData[];
}

interface GraphGridProps {
    graphsInfo: GraphInfo[];
}

function GraphGrid({ graphsInfo }: GraphGridProps) {
    return (
        <Container style={{ display: "flex", justifyContent: "center", maxWidth: "none" }}>
            <Grid container rowSpacing={8} columnSpacing={8} pt={8}>
                {graphsInfo.map((graphInfo, index) => (
                    <Graph key={index} data={graphInfo.values} title={graphInfo.title} />
                ))}
            </Grid>
        </Container>
    );
}

export default GraphGrid;
