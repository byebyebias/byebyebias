import React from 'react';
import './Footer.css';

type FooterProps = {
    label: string;
}

const Footer:React.FC<FooterProps> = ({ label }) => {
    return (
        <button 
            className="footer">
            {label}
        </button>
    );
};

export default Footer;