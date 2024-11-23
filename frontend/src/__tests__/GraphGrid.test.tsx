import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphGrid from '../views/components/Dashboard/GraphGrid/GraphGrid';


describe('renders the GraphGrid with the correct graphs', async () => {
    const graphsInfo=
        [{'title': 'Disparate Impact', 'values': [{'protected_attribute': 'sender_gender', 'score': 0.03}]}, 
        {'title': 'Statistical Parity Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.51}]}, 
        {'title': 'Average Odds Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.49}]}];

    render(<GraphGrid graphsInfo={graphsInfo}/>);

    screen.debug()

    
    const titleElement1 = screen.getByText(/Disparate Impact/i);
    const titleElement2 = screen.getByText(/Statistical Parity Difference/i);
    const titleElement3 = screen.getByText(/Average Odds Difference/i);
        
    expect(titleElement1).toBeInTheDocument();
    expect(titleElement2).toBeInTheDocument();
    expect(titleElement3).toBeInTheDocument();

});
