import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphGrid from '../views/components/Dashboard/GraphGrid/GraphGrid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

// jest.mock('../views/components/BarChart/BarChart',() => () => <div>BarChart Component</div>);

jest.mock('../views/components/Dashboard/Graph/Graph.tsx', () => () => <div>Graph Component</div>);

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
        expect(screen.getAllByText('Graph Component')).toHaveLength(3);
    
    });

    }
    
);

