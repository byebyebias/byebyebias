import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphGrid from '../views/components/Dashboard/GraphGrid/GraphGrid';

test('renders the GraphGrid with the correct graphs', () => {
    const graphsInfo=
        [{'title': 'Disparate Impact', 'values': [{'protected_attribute': 'sender_gender', 'score': 0.03}]}, 
        {'title': 'Statistical Parity Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.51}]}, 
        {'title': 'Average Odds Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.49}]}];

    beforeEach(() => {
        render(<GraphGrid graphsInfo={graphsInfo}/>);
    })

    test("renders all three graph titles", () => {
        const titleElement1 = screen.getByText(/Disparate Impact/i);
        const titleElement2 = screen.getByText(/Statistical Parity Difference/i);
        const titleElement3 = screen.getByText(/Average Odds Difference/i);
        expect(titleElement1).toBeInTheDocument();
        expect(titleElement2).toBeInTheDocument();
        expect(titleElement3).toBeInTheDocument();

    })


});
