import React, { useState } from 'react';
import { S3LinkUploadController } from "../controllers/S3LinkUploadController"
import { S3LinkUploadInteractor } from "../usecases/S3LinkUploadInteractor";
import { S3LinkUploadPresenter } from "../presenters/S3LinkUploadPresenter";
import Button from "./components/Button/Button";

const S3LinkUploadView: React.FC = () => {
  const [s3Link, sets3Link] = useState('')
  const presenter = new S3LinkUploadPresenter();
  const interactor = new S3LinkUploadInteractor();
  const controller = new S3LinkUploadController(interactor, presenter);

  const handleButtonClick = () => {
    if (s3Link.trim() != "") {
      controller.handleS3Link(s3Link);
    } else {
      alert("Provide a valid S3 Link.")
    }
  };

  return (
    <div>
      <input
        type="text"
        value={s3Link}
        onChange={(e) => sets3Link(e.target.value)}
        placeholder="Paste the S3 link here"
        />
        <Button label="Upload Link >" onClick={() => { handleButtonClick(); }} />
    </div>
  );
};

export default S3LinkUploadView;