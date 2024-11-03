import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer/Footer';

test('renders the footer with the correct label', () => {
    
    render(<Footer label="Team Triple B is the best"/>);

    const buttonElement = screen.getByText(/Team Triple B is the best/i);
    expect(buttonElement).toHaveTextContent("Team Triple B is the best");  
});
