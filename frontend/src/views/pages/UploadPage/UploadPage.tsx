import { Typography, Button, Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRef, useState } from "react";

import { S3LinkUploadController } from "../../../controllers/S3LinkUploadController";
import { S3LinkUploadInteractor } from "../../../usecases/S3LinkUploadInteractor";
import { S3LinkUploadPresenter } from "../../../presenters/S3LinkUploadPresenter";

import { UploadFileController } from "../../../controllers/UploadFileController";
import { UploadFileInteractor } from "../../../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../../../presenters/UploadFilePresenter";

import UploadFileView from "../../components/Upload/UploadFileView";
import styles from "./UploadPage.module.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const protectedAttributes = [
	"sender_gender",
	"sender_race",
	"sender_age",
	"receiver_gender",
	"receiver_race",
	"receiver_age",
];

function UploadPage() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [page, setPage] = useState<number>(1);
	const [link, setLink] = useState<string>("");
	const [selectedButtons, setSelectedButtons] = useState<Array<string>>([]);
	const linkRef = useRef<HTMLInputElement | null>(null);

	const file_presenter = new UploadFilePresenter();
	const file_interactor = new UploadFileInteractor();
	const file_controller = new UploadFileController(
		file_interactor,
		file_presenter,
	);

	const s3_presenter = new S3LinkUploadPresenter();
	const s3_interactor = new S3LinkUploadInteractor();
	const s3_controller = new S3LinkUploadController(
		s3_interactor,
		s3_presenter,
	);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFile = event.target.files?.[0];
		if (newFile) setFile(newFile);
	};

	const handleUploadClick = () => {
		if (file && link) {
			linkRef.current?.setCustomValidity(
				"Please enter ONLY A FILE or ONLY A LINK",
			);
			linkRef.current?.reportValidity();
		} else if (file) {
			setPage(2);
		} else if (link) {
			setPage(2);
		} else if (linkRef.current?.reportValidity()) {
			setPage(2);
		}
	};

	const handleAttributeClick = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const buttonValue = event.target.textContent!;

		if (selectedButtons.includes(buttonValue)) {
			setSelectedButtons(
				selectedButtons.filter((attribute) => attribute != buttonValue),
			);
		} else {
			setSelectedButtons([...selectedButtons, buttonValue]);
		}
	};

	const handleViewResults = () => {
		if (file != null) {
			return file_controller.handleFileUpload(file, selectedButtons);
		} else if (link != null) {
			return s3_controller.handleS3Link(link, selectedButtons);
		}
	};

	const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLink(e.target.value);

	return (
		<>
			<Navbar />
			<Container
				maxWidth={false}
				disableGutters
				className={styles.container}
				aria-labelledby="uploadHeader"
			>
				{page === 1 && (
					<>
						<main className={styles.center}>
							<Typography
								variant="h1"
								fontSize="4em"
								fontWeight="600"
								id="uploadHeader"
								fontFamily="Montserrat"
							>
								Upload Dataset
							</Typography>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<UploadFileView
									handleFileChange={handleFileChange}
								/>
								<Typography
									variant="body2"
									fontFamily="Montserrat"
								>
									{file ? file.name : ""}
								</Typography>
							</Box>

							<Typography
								variant="h2"
								fontSize="2.5em"
								fontWeight="500"
								fontFamily="Montserrat"
							>
								or
							</Typography>

							<div style={{ position: "relative" }}>
								<img
									alt=""
									src="linkIcon.png"
									className={styles.bucketLinkIcon}
								/>
								<input
									id="bucketInput"
									name="bucketInput"
									className={styles.bucketUrlInput}
									type="url"
									placeholder="paste public s3 bucket link"
									value={link}
									onChange={onLinkChange}
									ref={linkRef}
									// label for accesibility
									aria-label="paste public s3 bucket link"
								/>
							</div>

							<Button
								onClick={handleUploadClick}
								className={styles.uploadButton}
								disabled={file == undefined && link == ""}
							>
								Upload
							</Button>
						</main>
					</>
				)}

				{page === 2 && (
					<>
						<main className={styles.center} aria-live="polite">
							<Typography
								variant="h1"
								fontSize="4em"
								fontWeight="bold"
								id="uploadHeader"
								fontFamily="Montserrat"
							>
								Select Attributes
							</Typography>

							{/* TODO FOR BUCKET, ADD ACTUAL FILE NAME WHEN CONNECTED WITH S3 INTEGRATION*/}
							<Typography
								variant="h2"
								fontSize="1.25em"
								fontFamily="Montserrat"
							>
								Selected attributes in{" "}
								<span className={styles.filename}>
									{file
										? file.name
										: new URL(link).pathname
												.split("/")
												.pop() ||
											"INSERTDUMMYBUCKETNAME.parquet"}
								</span>{" "}
								will be scanned for bias
							</Typography>
							<Grid
								container
								spacing={{ xs: 2, md: 3 }}
								columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
								className={styles.attributeSelection}
							>
								{protectedAttributes.map((attribute, index) => (
									<Grid
										size={1}
										sx={{
											display: "flex",
											justifyContent: "center",
										}}
									>
										<Button
											onClick={handleAttributeClick}
											key={attribute}
											className={`${styles.attributeButton} ${selectedButtons.includes(attribute) ? styles.selectedAttribute : ""}`}
										>
											{attribute}
										</Button>
									</Grid>
								))}
							</Grid>

							<Button
								variant="contained"
								onClick={handleViewResults}
								className={styles.uploadButton}
							>
								View Results
							</Button>
						</main>
					</>
				)}
			</Container>

			<footer>
				<Footer label="made with <3 by team triple b." />
			</footer>
		</>
	);
}

export default UploadPage;
