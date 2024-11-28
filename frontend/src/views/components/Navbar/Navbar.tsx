import React from 'react';
import Logo from "../../assets/CashAppLogo.png"; 
import './Navbar.css'; 
import { Link } from 'react-router-dom';

type ProcessStepProps = {
    title: React.ReactNode;
    stepnum: number;
    body: string;

}

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li>
            <Link className="logo" to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
