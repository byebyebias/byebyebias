import React from "react";
import Button from "../../Button/Button";
import "./ExportJsonButton.css";

interface ExportJSONButtonProps {
	data: any;
	graphsInfo: { title: string; values: number[] }[];
}

const ExportJSONButton: React.FC<ExportJSONButtonProps> = ({
	data,
	graphsInfo,
}) => {
	const handleExport = () => {
		const exportData = {
			overview: data,
			graphs: graphsInfo,
		};

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: "application/json",
		});
		const fileURL = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = fileURL;
		link.download = "dashboard_data.json";

		document.body.appendChild(link);
		link.click();

		URL.revokeObjectURL(fileURL);
	};

	return (
		<Button
			className="export-button"
			label="Export Results to JSON"
			onClick={handleExport}
		/>
	);
};

export default ExportJSONButton;
