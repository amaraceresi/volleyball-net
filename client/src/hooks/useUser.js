import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

export function useUser() {
  return useSelector(getUser);
}
