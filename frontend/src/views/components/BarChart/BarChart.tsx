import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

export interface BarChartData {
	metric_value: number;
	attribute: string; // x-axis, the attribute we are measuring this metric for (Ex, age race gender)
	[key: string]: any;
}

type BarProps = {
	xaxis: string;
	yaxis: string;
	data: BarChartData[];
	onClick: void;
	height: string;
	width: string;
};

const BarChart: React.FC<BarProps> = ({
	xaxis,
	yaxis,
	data,
	onClick,
	height,
	width,
}) => {
	return (
		<div style={{ height, width }}>
			<ResponsiveBar
				data={data}
				keys={[yaxis]}
				indexBy={xaxis}
				maxValue={2}
				margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
				padding={0.3}
				colors={{ scheme: "nivo" }}
				borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: "middle",
					legendOffset: 32,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: "middle",
					legendOffset: -40,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
				animate={true}
			/>
		</div>
	);
};

export default BarChart;
