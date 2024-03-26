// TNavbar.jsx
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import '../styles/TNavstyle.css';

const TNavbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Logo
      </Link>
      <h3>CHESS ACADEMY PROTAL AND ADMISSION...!</h3>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Feedback
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link" onClick={closeMenu}>
            Leaderboard
          </Link>
        </li>
        {/* Add other navigation links as needed */}
      </ul>
    </nav>
  );
};

export default TNavbar;
