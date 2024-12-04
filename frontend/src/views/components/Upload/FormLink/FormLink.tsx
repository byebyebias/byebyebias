import { TextField } from "@mui/material";

function FormLink() {
	return (
		// To-do: display error in textfield when link is not successful
		<TextField
			id="filled-basic"
			label="paste public s3 bucket link"
		></TextField>
	);
}

export default FormLink;
