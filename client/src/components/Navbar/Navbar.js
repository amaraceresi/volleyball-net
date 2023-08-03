import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import AuthService from "../../utils/auth";
import './Navbar.css';

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logOut());
  };

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        {!isAuthenticated && (
          <Link to="/" className="navbar-item">
            Home
          </Link>
        )}
        {isAuthenticated && (
          <React.Fragment>
            <Link to="/tournaments" className="navbar-item">
              Tournaments
            </Link>
            <Link to="/dashboard" className="navbar-item">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="navbar-item">
              Logout
            </button>
          </React.Fragment>
        )}
        {!isAuthenticated && (
          <React.Fragment>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/signup" className="navbar-item">
              Signup
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
