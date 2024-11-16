import { 
    Typography,
    Button,
    TextField,
    Container,
    Box,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";

import { UploadFileController } from "../../../controllers/UploadFileController"
import { UploadFileInteractor } from "../../../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../../../presenters/UploadFilePresenter";

import UploadFileView from "../../UploadFileView";
import styles from "./UploadPage.module.css"

const protectedAttributes = ["sender_gender", "sender_race", "sender_age", "receiver_gender", "receiver_race"]

function UploadPage() {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [page, setPage] = useState<number>(1)

    const presenter = new UploadFilePresenter();
    const interactor = new UploadFileInteractor();
    const controller = new UploadFileController(interactor, presenter);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        if (newFile) setFile(newFile)
    };

    const handleUploadClick = () => {
        if (file) controller.handleFileUpload(file);
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            className={styles.container}
            aria-labelledby="uploadHeader"
        >
            {page === 1 &&
                <>
                    <header>
                        <Typography variant="h1" fontSize="4em" fontWeight="500" id="uploadHeader">Upload Your Dataset</Typography>
                    </header>

                    <main className={styles.center}>

                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <UploadFileView handleFileChange={handleFileChange}/>
                            <Typography variant="body2">{file ? file.name : ''}</Typography>
                        </Box>

                        <Typography variant="h2" fontSize="2.5em" fontWeight="500">or</Typography>
                        <label for="bucketInput" hidden>paste public s3 bucket link</label>
                        <input 
                            id="bucketInput"
                            name="bucketInput"
                            className={styles.bucketUrlInput} 
                            type="url"
                            placeholder="paste public s3 bucket link" 
                        />

                        <Button 
                            onClick={() => setPage(2)}
                            sx={{ 
                                backgroundColor: "#00CF31", 
                                color: "white", 
                                borderRadius: "30px", 
                                padding: "10px 30px", 
                                textTransform: "none",
                            }}
                            disabled={file == undefined}
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
                        <Typography variant="h2"  fontSize="1.25em">
                            Selected attributes in <span className={styles.filename}>{file.name}</span> will be scanned for bias
                        </Typography>
                        <Grid 
                            container 
                            spacing={{ xs: 2, md: 3 }} 
                            columns={{xs: 1, sm: 1, md: 2, lg: 3, xl: 3}} 
                            className={styles.attributeSelection}
                        >
                            {protectedAttributes.map((attribute, index) => 
                                <Grid item size={1} sx={{display: "flex", justifyContent: "center"}}>
                                    <Button 
                                        key={index}
                                        className={styles.attributeButton}
                                    >
                                        {attribute}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>

                        <Button variant="contained" onClick={handleUploadClick}>
                            View Results
                        </Button>
                    </main>
                </>
            }
        </Container>    
    )
}

export default UploadPage;