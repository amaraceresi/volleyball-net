import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import Page from "../../components/Page";
import AuthService from "../../utils/auth";
import './Signup.css';

const headContent = (
  <>
    <title>Sign Up</title>
    <meta
      name="description"
      content="Sign Up page for Volleyball Net."
    />
  </>
);

export default function SignUp() {
  const [addUser, { error, loading }] = useMutation(ADD_USER);
  const { isAuthenticated } = useSelector(getUser);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
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
      const { data, errors } = await addUser({
        variables: { ...formState },
      });

      if (errors) {
        console.error('Mutation errors:', errors);
        return;
      }

      console.log('Mutation response:', data);

      if (!data || !data.addUser) {
        console.error('No data returned from mutation');
        return;
      }

      const { token, user } = data.addUser;
      if (!token) {
        console.error('No token returned from mutation');
        return;
      }

      AuthService.login(token);
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page isProtected={false} headContent={headContent}>
      <div className="signup-container">
        <div className="container">
          <div className="title">Sign Up</div>
          <form className="form" onSubmit={handleFormSubmit}>
            <input
              placeholder="First Name"
              name="firstName"
              type="text"
              value={formState.firstName}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              name="lastName"
              type="text"
              value={formState.lastName}
              onChange={handleChange}
            />
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
                Submit
              </button>
            )}
          </form>
          {error && <h3>{error.message}</h3>}
        </div>
      </div> 
    </Page>
  );
}

