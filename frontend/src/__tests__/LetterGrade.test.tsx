import LetterGrade from "../views/components/Dashboard/LetterGrade/LetterGrade";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// TODO: add tests for colour rendering

test('renders lettergrade with the correct score', () => {
    render(<LetterGrade percentage={80} score="A-" />);

    const gradeElement = screen.getByText(/A-/i);
    expect(gradeElement).toHaveTextContent("A-");  
});

test('throws error when letter grade is out of bounds', () => {

    expect( () =>
        render(<LetterGrade percentage={101} score="A-" />)
    ).toThrow("Percentage out of bounds");  
});