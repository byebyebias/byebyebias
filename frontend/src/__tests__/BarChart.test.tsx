import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../views/components/Dashboard/BarChart/BarChart';
import { ResponsiveBar } from '@nivo/bar';

jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div>Mocked BarChart</div>),
}));

describe('BarChart Component', () => {
    const testData=[
        {'protected_attribute': 'sender_gender', 'score': 0.03}, 
        {'protected_attribute': 'sender_race', 'score': 0.03}]
 
    beforeEach(() => {
        render(<BarChart data={testData} height={''} width={''}/>);
    })

// checks if mock renders correctly
test("renders barchart", () => {
    // mocks a ResponsiveBar to use in testing
    
    const barElement = screen.getByText(/Mocked BarChart/i);
    expect(barElement).toBeInTheDocument();
});


test("renders data correctly", () => {
    // check if the data is passed correctly 

    render(<BarChart data={testData} height={''} width={''}/>);
    expect(ResponsiveBar).toHaveBeenCalledWith(
        expect.objectContaining({
            data: testData,
        }),
        {}
    );
});


test('renders data and styling correctly', () => {
    
    expect(ResponsiveBar).toHaveBeenCalledWith(
      expect.objectContaining({
        data: testData,
        keys: ['score'], // Ensure the key is correctly passed
        indexBy: 'protected_attribute', // Check the 'indexBy' property
        margin: { top: 50, right: 50, bottom: 50, left: 80 }, // Check margin
        padding: 0.3, // Check padding
        valueScale: { type: 'linear' }, // Check valueScale
        indexScale: { type: 'band', round: true }, // Check indexScale
        colors: expect.any(Function), // Check colors
        axisTop: null, // Axis top should be null
        axisRight: null, // Axis right should be null
        axisBottom: expect.objectContaining({
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'protected_attribute', // Legend for bottom axis
          legendPosition: 'middle',
          legendOffset: 32,
        }),
        axisLeft: expect.objectContaining({
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Score', // Legend for left axis
          legendPosition: 'middle',
          legendOffset: -60,
        }),
        labelSkipWidth: 12,
        labelSkipHeight: 12,
        labelTextColor: {
          from: 'color',
          modifiers: [['darker', 1.6]],
        },
        role: 'application',
      }),
      expect.anything() 
    );
  });

test("renders x and y axis correctly", () => {
      expect(ResponsiveBar).toHaveBeenCalled();
});

})
    

