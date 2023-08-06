// Auth.jsx
import AuthService from "../utils/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthenticatedUser } from "../redux/slices/userSlice";

export default function Auth({ children }) {
  const dispatch = useDispatch();

  const handleSetAuthenticatedUser = () => {
    if (!AuthService.loggedIn()) return;

    dispatch(setAuthenticatedUser(AuthService.getProfile()));
  };

  useEffect(() => {
    handleSetAuthenticatedUser();
  }, []); // Empty dependency array ensures it runs only once

  return children;
}
