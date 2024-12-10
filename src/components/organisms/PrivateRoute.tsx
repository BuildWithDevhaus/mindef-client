import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
