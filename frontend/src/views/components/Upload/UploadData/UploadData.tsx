import React, { useRef } from 'react';
import { Button } from "@mui/material";
import { UploadFileInteractor} from '../../../../usecases/UploadFileInteractor';
import { UploadFileController } from '../../../../controllers/UploadFileController';
import { UploadFilePresenter } from '../../../../presenters/UploadFilePresenter';
 
function UploadData({}) {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const presenter = new UploadFilePresenter();
    const interactor = new UploadFileInteractor();
    const controller = new UploadFileController(interactor, presenter);
    
    return (
        <Button variant='contained' onClick={() => {
            alert('clicked');
          }}>
            Upload
        </Button>
    );
}

export default UploadData;