import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../views/components/Title/Title';

test('renders the title with the correct text', () => {
    
    render(<Title label="BYE BYE BIAS"/>);

    const buttonElement = screen.getByText(/BYE BYE BIAS/i);
    expect(buttonElement).toHaveTextContent("BYE BYE BIAS");  
});
