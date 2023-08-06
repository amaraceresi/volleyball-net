const Banner = () => {
  const styles = {
    banner: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#3a8abf",
      width: "100%",
      color: "#ffffff",
      fontFamily: 'Anton, sans-serif',
      fontSize: "50px",
      fontWeight: "normal",
      letterSpacing: "4px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      margin: "0", // Ensure there's no additional margin
      boxSizing: "border-box", // Include padding in the width
    },
  };

  return (
    <div style={styles.banner}>HIGHPOINT GROVE BEACH VOLLEYBALL</div>
  );
};

export default Banner;
