import LetterGrade from "../views/components/Dashboard/LetterGrade/LetterGrade";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// TODO: add tests for colour rendering

test('renders lettergrade with the correct score', () => {
    render(<LetterGrade score="A-" />);

    const gradeElement = screen.getByText(/A-/i);
    expect(gradeElement).toHaveTextContent("A-");  
});