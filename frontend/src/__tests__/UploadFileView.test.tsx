import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadFileView from '../views/components/Upload/UploadFileView'; 
import { BrowserRouter } from 'react-router-dom';



test('renders the button with the correct label', () => {

    const handleClick = jest.fn();
    render(
        <BrowserRouter>
            <UploadFileView />
        </BrowserRouter>
    );
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent("Upload Data >");  
});
