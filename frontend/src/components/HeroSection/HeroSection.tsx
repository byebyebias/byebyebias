import React from 'react';
import Button from '../Button/Button'; // Import the button component
import './HeroSection.css'

type HeroSectionProps = {
    heading: string;
    body: string
    buttonLabel: string
    onClick: () => void;
}

const HeroSection:React.FC<HeroSectionProps> = ({ heading, body, buttonLabel, onClick }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left'}}>
            <h1 className="hero-heading">{heading}</h1>
            <p className="hero-body">{body}</p>

            {/* Create button component using HeroSection Props */}
            <Button label={buttonLabel} onClick={onClick} /> 
        </div>
        

    );
};

export default HeroSection;