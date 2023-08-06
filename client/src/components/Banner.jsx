import React from 'react';
import sandImage from '../images/sand.jpg'; 

const Banner = () => {
  const styles = {
    banner: {
      background: `url(${sandImage}) no-repeat center center`, 
      backgroundSize: 'cover',
      textAlign: "center",
      padding: "40px",
      width: "100%",
      color: "#ffffff",
      fontFamily: 'Anton, sans-serif',
      fontSize: "50px",
      fontWeight: "normal",
      letterSpacing: "4px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      margin: "0", 
      boxSizing: "border-box",
    },
    textContainer: {
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
      padding: "10px", 
    },
  };

  return (
    <div style={styles.banner}>
      <div style={styles.textContainer}>HIGHPOINT GROVE BEACH VOLLEYBALL</div>
    </div>
  );
};

export default Banner;
