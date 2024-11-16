import React from 'react';
import './HeroSection.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

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
            <Link to="upload" style={{ textDecoration: 'none' }}>  
                <Button onClick={() => null} label="get started >"/>
            </Link>
        </div>
    );
};

export default HeroSection;
