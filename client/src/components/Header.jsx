import { Link } from "react-router-dom";
import AuthServices from "../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import React from "react";

const Header = ({ style }) => {
  return (
    <header style={style}> {}
      {/* Your header content */}
    </header>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    width: "100%",
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    margin: "0.5rem",
  },
  undecoratedLink: {
    textDecoration: "none",
  },
};

export default function () {
  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    AuthServices.logout();
  };

  return (
    <nav style={styles.container}>
      <Link to={"/"} style={styles.undecoratedLink}>
      <h1 style={{ backgroundColor: "red", padding: "20px", width: "2000px", height: "20px", marginTop: "55px", }}>
          Highpoint Grove LLC-Beach at Highpoint
        </h1>

      </Link>
      <div style={styles.buttonDiv}>
        {isAuthenticated && (
          <Link to={"/dashboard"}>
            <button style={styles.button}>Dashboard</button>
          </Link>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        )}
        {!isAuthenticated && (
          <Link to={"/signup"}>
            <button style={styles.button}>Sign Up</button>
          </Link>
        )}
        {!isAuthenticated && (
          <Link to={"/login"}>
            <button style={styles.button}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
