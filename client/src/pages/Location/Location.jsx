import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Page from "../../components/Page";
import './Location.css';

const headContent = (
  <>
    <title>Location</title>
    <meta name="description" content="location" />
  </>
);

const MapComponent = ({ text }) => <div className="MapComponent">{text}</div>;

const Location = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);
  const center = {
    lat: 37.0565,
    lng: -86.2089
  };
  const zoom = 11;
  const address = '795 Noah Bledsoe Rd, Smiths Grove, KY 42171';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir//${address}`);
  };

  return (
    <Page isProtected={false} headContent={headContent}>
      <div className="MapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj2NYATpAJAJyNVdYrsj7Ei2JvdGBTvGw' }} 
          defaultCenter={center}
          defaultZoom={zoom}
          options={{
            mapTypeId: 'satellite',
          }}
        >
          <MapComponent
            lat={center.lat}
            lng={center.lng}
            text={address}
          />
        </GoogleMapReact>
        <button className="DirectionsButton" onClick={handleDirections}>
          Get Directions
        </button>
      </div>
    </Page>
  );
};

export default Location;
