import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphGrid from '../views/components/Dashboard/GraphGrid/GraphGrid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Graph} from '../views/components/Dashboard/Graph/Graph';

const theme = createTheme();

jest.mock('../views/components/Dashboard/Graph/Graph', () => ({
    __esModule: true, // This tells Jest that the module uses ES6 exports
    Graph: jest.fn(() => <div>Mocked Graph Component</div>),
  }));

jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div>Mocked ResponsiveBar</div>),
}));


const graphsInfo=
        [{'title': 'Disparate Impact', 'values': [{'protected_attribute': 'sender_gender', 'score': 0.03}]}, 
        {'title': 'Statistical Parity Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.51}]}, 
        {'title': 'Average Odds Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.49}]}];

describe('GraphGrid', () =>{

    beforeEach(() => {
        render(
            <ThemeProvider theme={theme}>
                <GraphGrid graphsInfo={graphsInfo}/>
            </ThemeProvider>
        )
    })

    test('renders the GraphGrid with the correct number of Graphs', () => {
        expect(screen.getAllByText('Mocked Graph Component')).toHaveLength(3);
    
    });

    test('test no graphInfo', () => {
        render(
            <ThemeProvider theme={theme}>
                <GraphGrid graphsInfo={undefined}/>
            </ThemeProvider>
        )
        expect(screen.getByText("No data available")).toBeInTheDocument()
    })

    }
    
);

