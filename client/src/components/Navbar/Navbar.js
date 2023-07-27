import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/dashboard" className="navbar-item">
            Dashboard
          </Link>
          <Link to="/tournamentlist" className="navbar-item">
            Tournament List
          </Link>
          <Link to="/tournamentdetails" className="navbar-item">
            Tournament Details
          </Link>
          <Link to="/login" className="navbar-item">
            Login
          </Link>
          <Link to="/signup" className="navbar-item">
            Signup
          </Link>
        </div>
    </nav>
  );
}

export default Navbar;
