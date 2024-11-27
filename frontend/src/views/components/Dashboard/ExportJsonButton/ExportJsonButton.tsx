import React from "react";
import Button from "../../Button/Button";

interface ExportJSONButtonProps {
    data: any,
    graphsInfo: { title: string; values: number[]} [];
}

const ExportJSONButton: React.FC<ExportJSONButtonProps> = ({ data, graphsInfo }) => {
    const handleExport = () => {
        const exportData = {
            overview: data,
            graphs: graphsInfo,
          };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "dashboard_data.json";
        link.click()
    };

    return (
        <Button label="Export to JSON" onClick={handleExport} />
    );
};

export default ExportJSONButton;