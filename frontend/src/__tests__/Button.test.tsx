import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../views/components/Button/Button';

test('renders the button with the correct label', () => {
    const handleClick = jest.fn();
    render(<Button className="Button" label="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveTextContent("Click Me");  
});

