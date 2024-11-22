import React from 'react';
import './Button.css';

type ButtonProps = {
    label: string;
    onClick: () => void;
}

const Button:React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button 
            className="button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;