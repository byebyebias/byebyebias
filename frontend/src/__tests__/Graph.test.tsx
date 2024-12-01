import { fireEvent, queryByLabelText, render, screen } from "@testing-library/react";
import {Graph} from "../views/components/Dashboard/Graph/Graph";
import '@testing-library/jest-dom';



jest.mock('../views/components/BarChart/BarChart',() => () => <div>BarChart Component</div>);
jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div>Mocked ResponsiveBar</div>),
}));

jest.mock('@mui/material/Modal', () => ({ children }: any) => <div>Mocked Modal</div>);


let graphsInfo=
        [{'title': 'Disparate Impact', 'values': [{'protected_attribute': 'sender_gender', 'score': 0.03}]}, 
        {'title': 'Statistical Parity Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.51}]}, 
        {'title': 'Average Odds Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.49}]}];


describe('Graph', () =>{

    beforeEach(() => {
        render(<Graph title={graphsInfo[0].title} values={graphsInfo[0].values}></Graph>)
    })
    
    test('renders Graph with the correct title', () => {
        expect(screen.getByText(/Disparate Impact/i)).toBeInTheDocument();    
    });

    }
    
);

