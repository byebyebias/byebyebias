import React from 'react';
import Logo from "../../assets/CashAppLogo.png"; 
import './Navbar.css'; 
import { Link } from 'react-router-dom';

type NavbarProps = {
  isDashboard: boolean,
}

const Navbar: React.FC<NavbarProps> = ({isDashboard}) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      {isDashboard ? <nav>
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/upload">Upload</Link>
                        </li>
                      </ul>
                    </nav> :
                    <></>}
    </header>
  );
};

export default Navbar;
