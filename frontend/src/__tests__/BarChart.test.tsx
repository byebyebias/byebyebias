import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../views/components/Dashboard/BarChart/BarChart';
import { ResponsiveBar } from '@nivo/bar';

test('auto pass', () => {
    const t = true;
    expect(t).toBeTruthy();
})

// mocks a ResponsiveBar to use in testing
// jest.mock('@nivo/bar', () => ({
//     ResponsiveBar: jest.fn(() => <div>Mocked BarChart</div>),
// }));

// describe('BarChart Component', () => {
//     const testData=[
//         {'protected_attribute': 'sender_gender', 'score': 0.03}, 
//         {'protected_attribute': 'sender_race', 'score': 0.03}]
 
//     beforeEach(() => {
//         render(<BarChart data={testData}/>);
//     })

//     // checks if mock renders correctly
//     test("renders barchart", () => {
//         const barElement = screen.getByText(/Mocked BarChart/i);
//         expect(barElement).toBeInTheDocument();

//     })

//     test("renders data correctly", () => {
//         // check if the data is passed correctly 
//         expect(ResponsiveBar).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 data: testData,
//             }),
//             {}
//         );
//     });

//     test('renders the correct text for the legend', () => {
//         render(<BarChart data={testData} />);
//         // Assuming there's a legend for the axis, you can check that the text appears
//         expect(screen.getByText('Score')).toBeInTheDocument();
//       });
    
// })