import React from 'react';
import Logo from "../../assets/CashAppLogo.png"; 
import './Navbar.css'; 
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar" aria-label="Main site navigation">

        <Link className="logo" to="/">
          <img src={Logo} alt="Bye Bye Bias Home Link" />
        </Link>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav> 
    </header>
  );
};

export default Navbar;
