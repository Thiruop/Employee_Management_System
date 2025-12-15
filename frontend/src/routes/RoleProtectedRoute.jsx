import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import NotFound from "../pages/NotFound";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
