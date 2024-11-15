import React from 'react';
import './HeroSection.css';
import UploadFileView from '../../UploadFileView';
import S3LinkUploadView from '../../S3LinkUploadView';

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
            <UploadFileView/>
            <S3LinkUploadView/>
        </div>
    );
};

export default HeroSection;
