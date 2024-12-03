import { Typography } from "@mui/material";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
	data: readonly BarDatum[];
	height: string;
	width: string;
}
const colorMap: { [key: string]: string } = {
	sender_gender: "#271DE0", // blueish
	sender_race: "#6820EA", // light purple
	receiver_gender: "#00D632", // bright green
	receiver_race: "#EE55E7", // pink
	sender_age: "#FFA500", // orange for age
	receiver_age: "#FF4500", // reddish-orange
};

const getLuminance = (r: number, g: number, b: number) => {
	const a = [r, g, b].map((v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

// Function to determine text color based on luminance
const getTextColor = (r: number, g: number, b: number) => {
	const luminance = getLuminance(r, g, b);
	return luminance > 0.5 ? "#000000" : "#ffffff"; // Black for light backgrounds, white for dark
};

const BarChart = ({
	data,
	width = "100%",
	height = "400px",
}: BarChartProps) => {
	// console.log("Data passed to BarChart:", data);

	return (
		<div style={{ height: height, width: width, overflowX: "auto" }}>
			<ResponsiveBar
				isFocusable={true}
				barAriaLabel={({ id, value, indexValue }) =>
					`The ${indexValue} bar has a score of ${value}`
				}
				theme={{
					labels: {
						text: {
							fontSize: "14px",
							fontFamily: "Montserrat",
							fontWeight: "400",
							fill: "333",
						},
					},
					axis: {
						ticks: {
							text: {
								fontSize: 12,
								fontFamily: "Montserrat",
								fill: "#333",
								maxWidth: "20px",
							},
						},
						legend: {
							text: {
								fontSize: 14,
								fontFamily: "Montserrat",
								fontWeight: "bold",
								fill: "#333",
							},
						},
					},
				}}
				data={data}
				keys={["score"]}
				indexBy="protected_attribute"
				margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
				padding={0.3}
				valueScale={{ type: "linear" }}
				indexScale={{ type: "band", round: true }}
				colors={({ id, data }) =>
					colorMap[data.protected_attribute] || "#cccccc"
				}
				borderColor={{
					from: "color",
					modifiers: [["darker", 1.6]],
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "protected_attribute",
					legendPosition: "middle",
					legendOffset: 32,
					truncateTickAt: 0,
					ariaHidden: true,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "Score",
					legendPosition: "middle",
					legendOffset: -60,
					ariaHidden: true,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={({ data }) => {
					const protectedAttribute = data.data?.protected_attribute; //if we have data.data, get the bckg color
					const colorHex = colorMap[protectedAttribute] || "#cccccc";
					const hexToRgb = (hex: string) => {
						const bigint = parseInt(hex.slice(1), 16);
						return [
							(bigint >> 16) & 255,
							(bigint >> 8) & 255,
							bigint & 255,
						];
					};
					const [r, g, b] = hexToRgb(colorHex);
					const textColor = getTextColor(r, g, b);
					return textColor;
				}}
				role="application"
			/>
		</div>
	);
};

export default BarChart;
