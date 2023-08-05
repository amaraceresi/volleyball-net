import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Page from "../../components/Page";
import './HomePage.css';

const headContent = (
  <>
    <title>Home</title>
    <meta name="description" content="This is Volleyball Net's homepage." />
  </>
);

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Page isProtected={false} headContent={headContent}>
      <div>
        <h1>Welcome to Our Volleyball Website!</h1>
        <div className="container">
          <Link to="/login" className="linkStyle">
            <button className="buttonStyle">Login</button>
          </Link>
          <Link to="/signup" className="linkStyle">
            <button className="buttonStyle">Sign Up</button>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
