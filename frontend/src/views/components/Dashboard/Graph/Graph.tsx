import {
	Card,
	CardContent,
	Typography,
	Modal,
	Box,
	IconButton,
	Link,
} from "@mui/material";
import BarChart from "../BarChart/BarChart";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import InfoButton from "../InfoButton/InfoButton";

interface GraphProps {
	title: string;
	values: {
		protected_attribute: string;
		score: number;
	}[];
	description?: string; // Description for the graph
	link?: string; // Link to AIF Docs for specific stat
}

export const Graph: React.FC<GraphProps> = ({
	title,
	values,
	description,
	link,
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
		console.log("modal has been opened");
	};

	const handleClose = () => {
		setOpen(false);
		console.log("modal has been closed");
	};

  return (
    <>
      <Card
        aria-label={`This graph displays the ${title} metric for each of your selected attributes`}
        tabIndex={0}
        sx={{
          border: "0.5px solid #000000",
          width: "30%",
          borderRadius: "35px",
          background: "#F8FEFA",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <Typography
            style={{
              textAlign: "left",
              paddingLeft: "20px",
              paddingTop: "30px",
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {title}
          </Typography>
          <BarChart data={values} height="350px" width="100%" />
          <IconButton aria-label="enlarge graph" onClick={handleOpen}>
            <OpenInFullIcon />
          </IconButton>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          p={6}
          aria-label={`Enlarged version of the ${title} graph`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            padding: "10px",
            borderRadius: "35px",
          }}
        >
          <Card
            component="div"
            sx={{
              position: "relative",
              width: "90%",
              height: "100%",
              display: "flex",
              borderRadius: "35px",
              backgroundColor: "#F8FEFA",
              overflow: "auto", // Handle large content
            }}
          >
            {/* Graph Section */}
            <Box sx={{ flex: 1, padding: "20px" }}>
              <Typography
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                  paddingTop: "30px",
                  fontFamily: "Montserrat",
                  fontSize: "30px",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                {title}
              </Typography>
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <BarChart data={values} height="500px" width="90%" />
              </CardContent>
            </Box>

						{/* Description Section */}
						<Box
							sx={{
								flex: 0.5,
								padding: "20px",
								borderLeft: "1px solid #ddd",
								marginLeft: "-50px",
								marginRight: "20px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Typography
								style={{
									fontFamily: "Montserrat",
									fontSize: "18px",
									fontWeight: "bold", // Bold header
									marginBottom: "10px",
									color: "#333",
								}}
							>
								Description
							</Typography>
							<Typography
								style={{
									fontFamily: "Montserrat",
									fontSize: "18px",
									lineHeight: 1.5,
									color: "#333",
								}}
							>
								{description ||
									"No description available for this graph."}
							</Typography>
							{link && (
								<Link
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										marginTop: "20px",
										fontFamily: "Montserrat",
										fontSize: "16px",
										fontWeight: 500,
										color: "#007BFF",
										textDecoration: "underline",
										"&:hover": {
											color: "#0056b3",
										},
									}}
								>
									Learn more about this on AIF360
								</Link>
							)}
						</Box>

						{/* Close Button */}
						<IconButton
							onClick={handleClose}
							aria-label="close popup"
							sx={{
								position: "absolute",
								zIndex: 1,
								top: 20,
								right: 20,
							}}
						>
							<CloseIcon />
						</IconButton>
					</Card>
				</Box>
			</Modal>
		</>
	);
};
