import React from 'react';
import Button from '../Button/Button'; // Import the button component
import './HeroSection.css';
import FileUpload from '../FileUpload/FileUpload';

type setState = (filename: string) => void;

type HeroSectionProps = {
    heading: string;
    body: string;
    // filename: string;
    // setFilename: setState;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heading, body }) => {
    return (
        <div className="hero-section">
            <h1 className="hero-heading">{heading}</h1>
            <p className="hero-body">{body}</p>
            <FileUpload/>
        </div>
    );
};

export default HeroSection;
