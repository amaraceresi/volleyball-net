import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticatedUser, getUser } from "../../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

import Page from "../../components/Page";
import AuthService from "../../utils/auth";

import "./Login.css";

const headContent = (
  <>
    <title>Login</title>
    <meta name="description" content="Login" />
  </>
);

export default function Login() {
  const [loginUser, { error, data, loading }] = useMutation(LOGIN_USER);
  const { isAuthenticated } = useSelector(getUser());
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      AuthService.login(data.loginUser.token);
      
      dispatch(setAuthenticatedUser({data: data.loginUser}));
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page isProtected={false} headContent={headContent}>
      <div className="login-container">
        <div className="container">
          <div className="title">Login</div>
          <form className="form" onSubmit={handleFormSubmit}>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            {loading ? (
              <button type="submit" disabled={true} className="submitBtn">
                Loading...
              </button>
            ) : (
              <button type="submit" className="submitBtn">
                Login
              </button>
            )}
          </form>
          {error && <div className="error">{error.message}</div>}
        </div>
      </div>
    </Page>
  );
}

