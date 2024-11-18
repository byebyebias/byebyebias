import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InfoButton from '../views/components/Dashboard/InfoButton/InfoButton';

test('renders the InfoButton with the correct tooltip description', async () => {
  const description = 'This is a test description for the tooltip.';
  render(<InfoButton description={description} />);

  // Find the IconButton
  const infoIcon = screen.getByRole('button');
  expect(infoIcon).toBeInTheDocument();

  // Simulate hover to trigger the tooltip
  await userEvent.hover(infoIcon);

  // Assert that the tooltip appears with the correct description
  const tooltip = await screen.findByText(description);
  expect(tooltip).toBeInTheDocument();
});

