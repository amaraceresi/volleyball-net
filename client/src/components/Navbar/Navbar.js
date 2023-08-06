import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import AuthService from "../../utils/auth";
import M from 'materialize-css';
import logo from '../../images/volley2.png';

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logOut());
  };

  return (
    <>
      <nav className="indigo darken-4">
        <div className="nav-wrapper custom-navbar">
          <Link to="/" className="brand-logo">
            {/* <img src={logo} alt="Volley" style={{ height: '50px', verticalAlign: 'middle' }} /> */}
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <div className="center-nav">
            <ul className="center hide-on-med-and-down">
              {!isAuthenticated && <li><Link to="/">Home</Link></li>}
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/location">Location</Link></li>
              <li><Link to="/about">About</Link></li>
              {isAuthenticated && <li><Link to="/tournaments">Tournaments</Link></li>}
              {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
              {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
          </div>
          <ul className="right hide-on-med-and-down">
            {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
            {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        {!isAuthenticated && <li><Link to="/">Home</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/location">Location</Link></li>
        <li><Link to="/about">About</Link></li>
        {isAuthenticated && <li><Link to="/tournaments">Tournaments</Link></li>}
        {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>}
        {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
        {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
      </ul>
    </>
  );
}

export default Navbar;
