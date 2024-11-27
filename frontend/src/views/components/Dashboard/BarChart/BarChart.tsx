import { Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";


// hard-coded colour chart
const colorMap = {
    "sender_gender": "#271DE0",
    "sender_race": "#6820EA",
    "receiver_gender": "#00D632", 
    "receiver_race": "#EE55E7",
};

const BarChart = ({ data }) => (
        <div style={{height: "300px", width: "100%"}}>
            <ResponsiveBar
                isFocusable={true}
                barAriaLabel={({ id, value, indexValue }) =>
                    `The ${indexValue} bar has a score of ${value}`
                }
                theme={{
                    labels: {
                        text: {
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: '400',
                            fill: '#333',
                        },
                    },
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 12,        // Font size for tick labels
                                fontFamily: 'Montserrat', // Font family for ticks
                                fill: '#333',         // Tick color
                            },
                        },
                        legend: {
                            text: {
                                fontSize: 14,        // Font size for legends
                                fontFamily: 'Montserrat', // Font family for legends
                                fontWeight: 'bold',    // Font weight for legends
                                fill: '#333',         // Legend color
                            },
                        },
                    },
                }}
                data={data}
                keys={[
                    'score'
                ]}
                indexBy="protected_attribute"
                margin={{ top: 50, right:50, bottom: 50, left: 80 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id, data }) => colorMap[data.protected_attribute] || "#cccccc"}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
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
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Score',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    truncateTickAt: 0
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#FFFFFF"
                
                role="application"
            />
        </div>
)

export default BarChart