import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      </div>
    </Page>
  );
};

export default HomePage;
