import React from 'react';
import Logo from "../../assets/CashAppLogo.png"; 
import './Header.css'; 

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} role="presentation"/>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#handy-guide">Guide</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
