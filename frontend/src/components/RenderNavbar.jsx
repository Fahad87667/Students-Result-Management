import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";

export function RenderNavbar() {
  const location = useLocation();
  return <div>{location.pathname !== "/" ? <Navigation /> : null}</div>;
}
