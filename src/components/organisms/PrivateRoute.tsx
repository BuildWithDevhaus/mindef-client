import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
