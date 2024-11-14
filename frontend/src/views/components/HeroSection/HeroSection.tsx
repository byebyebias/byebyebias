import React from 'react';
import './HeroSection.css';
<<<<<<< HEAD:frontend/src/components/HeroSection/HeroSection.tsx
import FileUpload from '../FileUpload/FileUpload';
import S3Integration from '../FileUpload/S3-Integration';
=======
import UploadFileView from '../../UploadFileView';
>>>>>>> main:frontend/src/views/components/HeroSection/HeroSection.tsx

type setState = (filename: string) => void;

type HeroSectionProps = {
    heading: string;
    body: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heading, body }) => {
    return (
        <div className="hero-section">
            <h1 className="hero-heading">{heading}</h1>
            <p className="hero-body">{body}</p>
<<<<<<< HEAD:frontend/src/components/HeroSection/HeroSection.tsx
            <FileUpload/>
            <S3Integration/>
=======
            <UploadFileView/>
>>>>>>> main:frontend/src/views/components/HeroSection/HeroSection.tsx
        </div>
    );
};

export default HeroSection;
