import React from "react";

import "./ProcessStep.css";

type ProcessStepProps = {
	title: React.ReactNode;
	stepnum: number;
	body: string;
};

const ProcessStep: React.FC<ProcessStepProps> = ({ title, body, stepnum }) => {
	return (
		<div className="process-header">
			{stepnum}. {title}
			<div className="process-body">{body}</div>
		</div>
	);
};

export default ProcessStep;
