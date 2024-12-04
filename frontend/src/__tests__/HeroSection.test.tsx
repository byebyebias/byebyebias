import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../views/components/HeroSection/HeroSection';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router'


const handleClick = jest.fn();


describe('HeroSection Component', () => {
    const mockedNavigation = jest.fn()
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigation)

    beforeEach(() => {
        render(
            <BrowserRouter>
                <HeroSection heading="First Step" body="So this is how you upload data..."/>
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

    test("Button click links to upload page", () => {
        const GetStartedButton = screen.getByText("Get Started >")
        fireEvent.click(GetStartedButton)

        expect(mockedNavigation).toHaveBeenCalledWith(
            "upload", 
            {
                "preventScrollReset": undefined,
                "relative": undefined, 
                "replace": false, 
                "state": undefined,
                "viewTransition": undefined
            }
        )
    })
    
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
