import React, { useRef } from "react";
import { UploadFileController } from "../controllers/UploadFileController"
import { UploadFileInteractor } from "../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../presenters/UploadFilePresenter";
import Button from "./components/Button/Button";

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
      <Button
        role={undefined}
        variant="contained"
        startIcon={<UploadIcon />}
        onClick={handleButtonClick}
        sx={{
          backgroundColor: "#A136D6",
          textTransform: "none",
          boxShadow: "none",
          fontFamily: "Montserrat",
        }}
        aria-label="Choose a file to upload"
      >
        Choose file
      </Button>
    </div>
  );
};

export default UploadFileView;
