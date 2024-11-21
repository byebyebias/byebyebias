import React from 'react';
import './HeroSection.css';
import UploadFileView from '../../UploadFileView';

type setState = (filename: string) => void;

type HeroSectionProps = {
    heading: React.ReactNode;
    body: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heading, body }) => {
    return (
        <div className="hero-section">
            <h1 className="hero-heading">{heading}</h1>
            <p className="hero-body">{body}</p>
            <UploadFileView/>
        </div>
    );
};

export default HeroSection;
