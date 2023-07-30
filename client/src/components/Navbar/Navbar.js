import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import AuthService from "../../utils/auth";
import './Navbar.css';

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user); // Access the authenticated state
  const dispatch = useDispatch();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logOut());
  };

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/tournamentlist" className="navbar-item">
          Tournament List
        </Link>
        <Link to="/tournamentdetails" className="navbar-item">
          Tournament Details
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="navbar-item">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="navbar-item">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/signup" className="navbar-item">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
  
  
}

export default Navbar;
