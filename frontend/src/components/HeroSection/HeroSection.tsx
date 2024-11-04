import React from 'react';
import Button from '../Button/Button'; // Import the button component
import './HeroSection.css';

type HeroSectionProps = {
    heading: string;
    body: string;
    buttonLabel: string;
    onClick: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heading, body, buttonLabel, onClick }) => {
    return (
        <div className="hero-section">
            <h1 className="hero-heading">{heading}</h1>
            <p className="hero-body">{body}</p>
            <Button label={buttonLabel} onClick={onClick} />
        </div>
    );
};

export default HeroSection;
