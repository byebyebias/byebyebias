import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../views/components/HeroSection/HeroSection';
import { BrowserRouter } from 'react-router-dom';


const handleClick = jest.fn();

describe('HeroSection Component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <HeroSection heading="First Step" body="So this is how you upload data..."/>)
            </BrowserRouter>
        )
    })

    test('renders hero section', () => {
    
        const heroElement = screen.getByText(/First Step/i);
        expect(heroElement).toBeInTheDocument();
      
    });
    
    test('renders hero section with correct title name', () => {
        
        const heroElement = screen.getByText(/First Step/i);
        expect(heroElement).toHaveTextContent("First Step");
      
    });
    
    // test('renders hero section with button', () => {
    
    //     const buttonElement = screen.getByText(/Click Me/i);
    //     expect(buttonElement).toBeInTheDocument();
    
    // });
    
    // test('renders hero section with correct button label', () => {
        
    //     const buttonElement = screen.getByText(/Click Me/i);
    //     expect(buttonElement).toHaveTextContent("Click Me");
    
    // });

    // test('button click calls handleClick', () => {

    //     const buttonElement = screen.getByText(/Upload Data >/i);
    //     buttonElement.click(); // Simulate a click
    //     expect(handleClick).toHaveBeenCalled(); 

    // });
})
