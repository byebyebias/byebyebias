import React from 'react';
import Logo from "../../assets/CashAppLogo.png"; 
import './Navbar.css'; 
import { Link } from 'react-router-dom';

type NavbarProps = {
    routes: Object
}

const Navbar: React.FC<NavbarProps> = () => {
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
