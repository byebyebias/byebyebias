import React from 'react';
import './Footer.css';

type FooterProps = {
    label: string;
}

const Footer: React.FC<FooterProps> = ({ label }) => {
    return (
        <footer className="footer"> 
            {label}
        </footer>
    );
};

export default Footer;
