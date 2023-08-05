import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Page from "../../components/Page";
import './HomePage.css';

const headContent = (
  <>
    <title>Home</title>
    <meta name="description" content="This is Volleyball Net's homepage." />
  </>
);

const MapComponent = ({ text }) => <div>{text}</div>;

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const center = {
    lat: 37.0565,
    lng: -86.2089
  };
  const zoom = 11;

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
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }} 
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <MapComponent
              lat={37.0565}
              lng={-86.2089}
              text={'795 Noah Bledsoe Rd, Smiths Grove, KY 42171'}
            />
          </GoogleMapReact>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
