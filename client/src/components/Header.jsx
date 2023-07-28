import { Link } from "react-router-dom";
import AuthServices from "../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

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

export default function Header() {
  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    AuthServices.logout();
  };

  return (
    <nav style={styles.container}>
      <Link to={"/"} style={styles.undecoratedLink}>
        <h1>Project-3 Starter Code</h1>
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
