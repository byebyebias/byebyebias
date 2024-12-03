import { CardContent, Typography, Card, List, ListItem } from "@mui/material";

type PrivilegedGroup = {
	[key: string]: string;
};

interface OverviewProps {
	data: {
		score: string;
		percentage: number;
		privileged_groups: PrivilegedGroup;
		accuracy: number;
	};
}

function Overview({ data }: OverviewProps) {
	return (
		<Card
			sx={{
				width: "65%",
				background: "#F8FEFA",
				border: "0.5px solid #000000",
				boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				borderRadius: "0px 35px 35px 0px",
			}}
		>
			<CardContent sx={{ flexDirection: "column", display: "flex" }}>
				<Typography
					variant="h2"
					sx={{
						paddingLeft: "25px",
						paddingTop: "10px",
						paddingBottom: "10px",
						textAlign: "left",
						fontFamily: "Montserrat",
						fontStyle: "normal",
						fontWeight: 700,
						fontSize: "40px",
						color: "#28282C",
					}}
				>
					Overview:
				</Typography>

				<Typography
					variant="body2"
					sx={{
						paddingLeft: "25px",
						textAlign: "left",
						fontFamily: "Montserrat",
						fontStyle: "normal",
						fontWeight: 200,
						fontSize: "22px",
						color: "#28282C",
					}}
				>
					<b>Accuracy:</b> {data.accuracy}%
					<br />
					<b>Privileged Groups:</b>
					{Object.entries(data.privileged_groups).map(
						([key, value]) => (
							<div key={key}>
								- {key}: {value}
							</div>
						),
					)}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Overview;
