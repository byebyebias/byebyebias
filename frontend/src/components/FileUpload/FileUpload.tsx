// src/components/FileUpload.tsx
import React, { useRef, useState } from "react";
import Button from "../Button/Button";
const apiUrl = import.meta.env.VITE_API_URL;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };


  // triggers file input by calling fileInputRef
  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${apiUrl}/api/upload/`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.log("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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
      <Button label="Upload Data >" onClick={handleButtonClick}/>
    </div>
  );
};

export default FileUpload;
