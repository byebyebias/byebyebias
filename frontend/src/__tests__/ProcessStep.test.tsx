import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProcessStep from '../views/components/ProcessStep/ProcessStep';

const handleClick = jest.fn();


describe('ProcessStep Component', () => {
    beforeEach(() => {
        render(<ProcessStep title="First Step" stepnum={1} body="So this is how you upload data..."/>);
    })

    test('renders process step', () => {
    
        const stepElement = screen.getByText(/First Step/i);
        expect(stepElement).toBeInTheDocument();
      
    });

    test('renders process step with correct title', () => {
    
        const stepElement = screen.getByText(/First Step/i);
        expect(stepElement).toHaveTextContent("First Step");
      
    });
    
    test('renders process step body', () => {
        
        const stepElement = screen.getByText(/So this is how you upload data.../i);
        expect(stepElement).toBeInTheDocument()
      
    });
    
})

