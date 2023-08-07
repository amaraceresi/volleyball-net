import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import AuthService from "../../utils/auth";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logOut());
  };

  const links = [
    !isAuthenticated && { to: '/', text: 'HOME' },
    { to: '/contact', text: 'CONTACT' },
    { to: '/location', text: 'LOCATION' },
    { to: '/about', text: 'ABOUT' },
    isAuthenticated && { to: '/tournaments', text: 'TOURNAMENTS' },
    isAuthenticated && { to: '/dashboard', text: 'DASHBOARD' },
    isAuthenticated && { onClick: handleLogout, text: 'LOGOUT' },
    !isAuthenticated && { to: '/login', text: 'LOGIN' },
    !isAuthenticated && { to: '/signup', text: 'SIGNUP' }
  ].filter(Boolean);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#1a237e' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
              {links.map((link, index) => (
                <li key={index} style={{ margin: '0 10px' }}>
                  {link.to ? <Link to={link.to} style={{ color: 'white', textDecoration: 'none' }}>{link.text}</Link> : <Button onClick={link.onClick} style={{ color: 'white' }}>{link.text}</Button>}
                </li>
              ))}
            </ul>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
        <List>
          {links.map((link, index) => (
            <ListItem button key={index}>
              {link.to ? <Link to={link.to} onClick={handleToggleDrawer} style={{ color: 'black', textDecoration: 'none' }}>{link.text}</Link> : <Button onClick={link.onClick}>{link.text}</Button>}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
