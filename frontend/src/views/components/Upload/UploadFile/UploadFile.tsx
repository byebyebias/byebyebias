import { Button } from "@mui/material";

function UploadFile({ onClick }) {
	return (
		<Button variant="contained" onClick={onClick}>
			Choose File
		</Button>
	);
}

export default UploadFile;
