import React, { useEffect } from 'react'; // import useEffect
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
  const navigate = useNavigate(); // this allows you to programmatically navigate
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated); // replace 'auth' with the actual name of your auth slice of the state

  useEffect(() => {
    if (isAuthenticated) { // if user is authenticated...
      navigate('/dashboard'); // navigate to the dashboard
    }
  }, [isAuthenticated, navigate]); // only run this effect when isAuthenticated or navigate changes

  return (
    <Page isProtected={false} headContent={headContent}>
      <div>
        <h1>Welcome to Our Volleyball Website!</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </Page>
  );
};

export default HomePage;
