import React from 'react';
import './Title.css';

type TitleProps = {
    label: string;
}

const Title: React.FC<TitleProps> = ({ label }) => {
    return (
        <div className="title-section">
            <h1 className="glitch">{label}</h1>
        </div>
    );
};

export default Title;
