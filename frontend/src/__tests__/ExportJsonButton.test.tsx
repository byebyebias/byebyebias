import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExportJSONButton from '../views/components/Dashboard/ExportJsonButton/ExportJsonButton'; 
import Button from '../views/components/Button/Button';

const mockData = {
    top_category: 'ABC', 
    score: 85,
}
const mockGraphsInfo = [
    { title: 'Disparate Impact', values: [0.1, 0.2, 0.3]},
    { title: 'Statistical Parity Difference', values: [0.4, 0.5, 0.6]}
];

describe('ExportJSONButton', () => {
    // mock the URL.createObjectURL and Blob
    beforeAll(() => {
        global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
        global.URL.revokeObjectURL = jest.fn();

        global.Blob = jest.fn().mockImplementation((options) => {
            return {
                size: 100,
                type: options.type,
            };
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should render the button with correct label', () => {
        render(<ExportJSONButton data={mockData} graphsInfo={mockGraphsInfo} />)
        const buttonElement = screen.getByText(/Export Results to JSON/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('should trigger file download on click with correct JSON data', () => {

        render(<ExportJSONButton data={mockData} graphsInfo={mockGraphsInfo} />)

        const buttonElement = screen.getByText(/Export Results to JSON/i);
        fireEvent.click(buttonElement);

        expect(global.URL.createObjectURL).toHaveBeenCalled();

        expect(global.Blob).toHaveBeenCalledWith(
            [JSON.stringify({ overview: mockData, graphs: mockGraphsInfo }, null, 2)], { type: 'application/json' }
        );

        expect(global.Blob).toHaveBeenCalledTimes(1);
    });
});