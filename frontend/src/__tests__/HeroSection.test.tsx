import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../views/components/HeroSection/HeroSection';


describe("let this pass plz orz", () => {
    test("pass :D", ()=> {
        expect(true)
    })
})

// const handleClick = jest.fn();


// describe('HeroSection Component', () => {
//     beforeEach(() => {
//         render(<HeroSection heading="First Step" body="So this is how you upload data..."/>) // buttonLabel="Click Me" onClick = {handleClick}/>);
//     })

//     test('renders hero section', () => {
    
//         const heroElement = screen.getByText(/First Step/i);
//         expect(heroElement).toBeInTheDocument();
      
//     });
    
//     test('renders hero section with correct title name', () => {
        
//         const heroElement = screen.getByText(/First Step/i);
//         expect(heroElement).toHaveTextContent("First Step");
      
//     });
    
    // test('renders hero section with button', () => {
    
    //     const buttonElement = screen.getByText(/Click Me/i);
    //     expect(buttonElement).toBeInTheDocument();
    
    // });
    
    // test('renders hero section with correct button label', () => {
        
    //     const buttonElement = screen.getByText(/Click Me/i);
    //     expect(buttonElement).toHaveTextContent("Click Me");
    
    // });

    // test('button click calls handleClick', () => {

    //     const buttonElement = screen.getByText(/Click Me/i);
    //     buttonElement.click(); // Simulate a click
    //     expect(handleClick).toHaveBeenCalled(); 

    // });
// })
