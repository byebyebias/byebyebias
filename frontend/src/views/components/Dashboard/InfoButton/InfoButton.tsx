import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface InfoButtonProps {
	description: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ description }) => {
	return (
		<Tooltip title={description} placement="top">
			<IconButton style={{ position: "absolute", top: 10, right: 10 }}>
				<InfoIcon />
			</IconButton>
		</Tooltip>
	);
};

export default InfoButton;
