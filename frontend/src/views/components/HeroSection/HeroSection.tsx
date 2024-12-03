<<<<<<< HEAD
import React from 'react';
import './HeroSection.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
=======
import React from "react";
import "./HeroSection.css";
import UploadFileView from "../Upload/UploadFileView";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
>>>>>>> 0c2160227812245003b220dd4c091827e3f5965a

type setState = (filename: string) => void;

type HeroSectionProps = {
	heading: React.ReactNode;
	body: React.ReactNode;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heading, body }) => {
	return (
		<div className="hero-section">
			<h1 className="hero-heading">{heading}</h1>
			<p className="hero-body">{body}</p>
			<Link to="upload" style={{ textDecoration: "none" }}>
				<Button
					className="button"
					onClick={() => null}
					label="Get Started >"
				/>
			</Link>
		</div>
	);
};

export default HeroSection;
