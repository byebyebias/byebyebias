<<<<<<< HEAD
import React from 'react';
import './Footer.css';
=======
// src/components/Footer/Footer.tsx
import React from "react";
import "./Footer.css";
>>>>>>> 0c2160227812245003b220dd4c091827e3f5965a

type FooterProps = {
	label: string;
};

const Footer: React.FC<FooterProps> = ({ label }) => {
	return <footer className="footer">{label}</footer>;
};

export default Footer;
