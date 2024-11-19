import { 
    Typography,
    Button,
    Container,
    Box,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useRef, useState } from "react";

import { UploadFileController } from "../../../controllers/UploadFileController"
import { UploadFileInteractor } from "../../../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../../../presenters/UploadFilePresenter";

import UploadFileView from "../../UploadFileView";
import styles from "./UploadPage.module.css"
import Footer from "../../components/Footer/Footer";

const protectedAttributes = ["sender_gender", "sender_race", "sender_age", "receiver_gender", "receiver_race"]

function UploadPage() {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [link, setLink] = useState<string>("")
    const linkRef = useRef<HTMLInputElement | null>(null)

    const presenter = new UploadFilePresenter();
    const interactor = new UploadFileInteractor();
    const controller = new UploadFileController(interactor, presenter);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        if (newFile) setFile(newFile)
    };

    const handleUploadClick = () => {
        if (file && link) {
            linkRef.current?.setCustomValidity("Please enter ONLY A FILE or ONLY A LINK")
            linkRef.current?.reportValidity()
        } else if (file) {
            setPage(2)
        } else if (linkRef.current?.reportValidity()) {
            setPage(2)
        } 

    };
    const handleViewResults = () => {if (file != null) return controller.handleFileUpload(file)};

    const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)

    return (
        <>
            <Container
                maxWidth={false}
                disableGutters
                className={styles.container}
                aria-labelledby="uploadHeader"
            >
                {page === 1 &&
                    <>
                        <header>
                            <Typography variant="h1" fontSize="4em" fontWeight="600" id="uploadHeader" fontFamily="Montserrat">Upload Your Dataset</Typography>
                        </header>

                        <main className={styles.center}>

                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <UploadFileView handleFileChange={handleFileChange}/>
                                <Typography variant="body2" fontFamily="Montserrat">{file ? file.name : ''}</Typography>
                            </Box>

                            <Typography 
                                variant="h2"
                                fontSize="2.5em"
                                fontWeight="500"
                                fontFamily="Montserrat"
                            >
                                or
                            </Typography>

                            <div style={{position:"relative"}}>
                                <img alt="" src="linkIcon.png" className={styles.bucketLinkIcon}/>
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
                                disabled={file == undefined && link == ''}
                            >
                                Upload
                            </Button>
                        </main>

                    </>
                }

                {page === 2 && 
                    <>
                        <header aria-live="polite">
                            <Typography  variant="h1" fontSize="4em" fontWeight="500" id="uploadHeader">Select Attributes</Typography>
                        </header>

                        <main className={styles.center} aria-live="polite">
                            {/* TODO FOR BUCKET, ADD ACTUAL FILE NAME WHEN CONNECTED WITH S3 INTEGRATION*/}
                            <Typography variant="h2"  fontSize="1.25em">
                                Selected attributes in <span className={styles.filename}>{file ? file.name : "INSERTDUMMYBUCKETNAME.parquet"}</span> will be scanned for bias
                            </Typography>
                            <Grid 
                                container 
                                spacing={{ xs: 2, md: 3 }} 
                                columns={{xs: 1, sm: 1, md: 2, lg: 3, xl: 3}} 
                                className={styles.attributeSelection}
                            >
                                {protectedAttributes.map((attribute, index) => 
                                    <Grid size={1} sx={{display: "flex", justifyContent: "center"}}>
                                        <Button 
                                            key={index}
                                            className={styles.attributeButton}
                                        >
                                            {attribute}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>

                            <Button variant="contained" onClick={handleViewResults}>
                                View Results
                            </Button>
                        </main>
                    </>
                }
            </Container>    

            <footer>
                <Footer label="made with <3 by team triple b."/>
            </footer>
        </>
    )
}

export default UploadPage;