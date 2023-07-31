import React from 'react';
import { Link } from 'react-router-dom';
import Page from "../../components/Page";

const headContent = (
  <>
    <title>Home</title>
    <meta name="description" content="This is Volleyball Net's homepage." />
  </>
);

const HomePage = () => {
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
