import { render, screen } from '@testing-library/react';
import Header from '../views/components/Header/Header';
import '@testing-library/jest-dom';

jest.mock('../views/assets/CashAppLogo.png', () => 'mocked-logo.png');

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links with correct text and href', () => {
    render(<Header />);
    
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '#about');
    
    const guideLink = screen.getByText('Guide');
    expect(guideLink).toBeInTheDocument();
    expect(guideLink).toHaveAttribute('href', '#handy-guide');
  });
});
