import React from 'react';
import './HeroSection.css';
import Button from '../Button/Button';

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
            <Button onClick={() => null} label="get started >"/>
        </div>
    );
};

export default HeroSection;
