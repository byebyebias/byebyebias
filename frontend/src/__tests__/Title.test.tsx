import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../components/Title/Title';

test('renders the title with the correct text', () => {
    
    render(<Title text="Bye Bye Bias"/>);

    const buttonElement = screen.getByText(/Bye Bye Bias/i);
    expect(buttonElement).toHaveTextContent("Bye Bye Bias");  
});
