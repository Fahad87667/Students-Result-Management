import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { gettoken } from "../services/adminservices";

export function Privateroute() {
  // Every component either it is class or function, it should return UI element
  const token = gettoken();
  if (token) {
    // open the secured component
    return <Outlet></Outlet>;
  } else {
    // navigate user to login screen
    return <Navigate to={"/"}></Navigate>;
  }
}
