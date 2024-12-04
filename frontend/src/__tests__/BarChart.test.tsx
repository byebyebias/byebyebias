import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../views/components/Dashboard/BarChart/BarChart';
import { getLuminance } from '../views/components/Dashboard/BarChart/BarChart';
import { ResponsiveBar } from '@nivo/bar';

jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div >Mocked BarChart</div>),
}));


describe('BarChart Component', () => {
    const testData=[
        {'protected_attribute': 'sender_gender', 'score': 0.03}, 
        {'protected_attribute': 'sender_race', 'score': 0.03}]
 
    beforeEach(() => {
        render(<BarChart data={testData} height={''} width={''}/>);
    })

    test('renders data and styling correctly', () => {
      expect(ResponsiveBar).toHaveBeenCalledWith(
        expect.objectContaining({
          isFocusable: true,
          barAriaLabel: expect.any(Function),
          theme: {
            labels: {
              text: {
                fontSize: "14px",
                fontFamily: "Montserrat",
                fontWeight: "400",
                fill: "333",
              },
            },
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fill: "#333",
                  maxWidth: "20px",
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fill: "#333",
                },
              },
            },
          },
          data: testData,
          keys: ["score"],
          indexBy: "protected_attribute",
          margin: { top: 50, right: 50, bottom: 50, left: 80 },
          padding: 0.3,
          valueScale: { type: "linear" }, 
          indexScale: { type: "band", round: true }, 
          colors: expect.any(Function),
          borderColor: {
            from: "color",
            modifiers: [["darker", 1.6]],
          },
          axisTop: null, 
          axisRight: null, 
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "protected_attribute",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
            ariaHidden: true,
          }, 
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Score",
            legendPosition: "middle",
            legendOffset: -60,
            ariaHidden: true,
          }, 
          labelSkipWidth: 12, 
          labelSkipHeight: 12, 
          labelTextColor: expect.any(Function),
          role: "application",
        }), 
        expect.anything() 
      )
  });

test("renders barchart", () => {
    
    const barElement = screen.getByText(/Mocked BarChart/i);
    expect(barElement).toBeInTheDocument();
});

test("renders data correctly", () => {

    expect(ResponsiveBar).toHaveBeenCalledWith(
        expect.objectContaining({
            data: testData,
        }),
        {}
    );
});

test("renders x and y axis correctly", () => {
      expect(ResponsiveBar).toHaveBeenCalled();
});

})

describe("test luminance function", () => {

  test("calculate luminance for white", () => {
    expect(getLuminance(255, 255, 255)).toBe(1)
  })
})
