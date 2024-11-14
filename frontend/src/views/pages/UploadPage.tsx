import UploadFileView from "../components/Upload/UploadFileView"
import Footer from "../components/Footer/Footer";
import FormLink from "../components/Upload/FormLink/FormLink";
import Upload from "../components/Upload/UploadData/UploadData";
import { Typography, Stack, Box } from "@mui/material";
import React from 'react';


function UploadPage() {
  
    return (
        <><Stack sx={{backgroundColor: '#E6EEF5'}}>
            <Typography>Upload your dataset</Typography>
            <UploadFileView/>
            <Typography>or</Typography>
            <FormLink></FormLink>
            <Upload></Upload>

        </Stack>
      <Footer label="© 2024 Team TripleB" /></>
    );
  }
  
  export default UploadPage;