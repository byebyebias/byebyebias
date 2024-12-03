import React from "react";
import "./Button.css";

type ButtonProps = {
	label: string;
	onClick: () => void;
	className: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
	return (
		<button className={className} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
