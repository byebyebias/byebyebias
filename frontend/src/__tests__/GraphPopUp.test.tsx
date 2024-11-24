import GraphGrid from "../views/components/Dashboard/GraphGrid/GraphGrid";
import GraphPopUp from "../views/components/Dashboard/GraphPopUp/GraphPopUp";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("popup tests", () => {

    const graphsInfo=
        [{'title': 'Disparate Impact', 'values': [{'protected_attribute': 'sender_gender', 'score': 0.03}]}, 
        {'title': 'Statistical Parity Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.51}]}, 
        {'title': 'Average Odds Difference', 'values': [{'protected_attribute': 'sender_gender', 'score': -0.49}]}];


    let open: boolean;
    let handleClose: jest.Mock;

    beforeEach(() => {
        handleClose = jest.fn();  // Mock the handleClose function
    });
    
    test("tests if modal is opened when toggled", ()=> {
        const open = true;
        render(<GraphPopUp title={"Test Title"} data={[graphsInfo[0]]} open={open} handleClose={handleClose}/>)

        expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
    })

    test("tests if modal is closed when not toggled", ()=> {
        const open = false;
        render(<GraphPopUp title={"Test Title"} data={[]} open={open} handleClose={handleClose}/>);

        expect(screen.queryByLabelText('Test Title')).not.toBeInTheDocument();
    })

    test("tests if close popup button was clicked", ()=> {
        const closeButton = screen.getByLabelText("Close popup");
        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalled();
    })
})