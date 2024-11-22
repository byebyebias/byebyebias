import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../views/components/BarChart/BarChart';
import { ResponsiveBar } from '@nivo/bar';

// mocks a ResponsiveBar to use in testing
jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div>Mocked BarChart</div>),
}));

describe('BarChart Component', () => {
    const testData=[
        {attribute: "Sender_Gender", metric_value: -0.25}, 
        {attribute: "Sender_Race", metric_value: 0.5}, ]
 
    beforeEach(() => {
        render(<BarChart xaxis="attribute" yaxis="metric_value" data={testData}/>);
    })

    // checks if mock renders correctly
    test("renders barchart", () => {
        const barElement = screen.getByText(/Mocked BarChart/i);
        expect(barElement).toBeInTheDocument();

    })

    test("renders data correctly", () => {
        // Check if the data is passed correctly (if you want to test the data passing logic)
        expect(ResponsiveBar).toHaveBeenCalledWith(
            expect.objectContaining({
                data: testData,
                keys: ["metric_value"],
                indexBy: "attribute",
            }),
            {}
        );
    });
})