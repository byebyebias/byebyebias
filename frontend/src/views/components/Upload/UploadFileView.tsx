import React, { useRef } from "react";
import { UploadFileController } from "../../../controllers/UploadFileController"
import { UploadFileInteractor } from "../../../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../../../presenters/UploadFilePresenter";
import Button from "../Button/Button";
import UploadFile from "./UploadFile/UploadFile"

const UploadFileView: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const presenter = new UploadFilePresenter();
  const interactor = new UploadFileInteractor();
  const controller = new UploadFileController(interactor, presenter);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        controller.handleFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".parquet"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      
      <UploadFile onClick={() => { handleButtonClick(); }}></UploadFile>
    </div>
  );
};

{/*<Button label="Upload Data >" onClick={() => { handleButtonClick(); }} />*/}
export default UploadFileView;
