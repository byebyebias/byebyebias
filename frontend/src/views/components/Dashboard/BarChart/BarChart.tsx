import { Typography } from "@mui/material";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
    data: readonly BarDatum[];
}

const BarChart = ({ data }: BarChartProps) => {
    console.log("Data passed to BarChart:", data); // Log the data here

    return (
        <div style={{ height: "300px" }}>
            <ResponsiveBar
                data={data}
                keys={['score']}
                indexBy="protected_attribute"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'protected_attribute',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Score',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                role="application"
            />
        </div>
    );
};

export default BarChart;
