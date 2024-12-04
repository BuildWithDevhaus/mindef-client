interface AdminLoginProps {
  onLogin: () => void;
}

interface PrivateRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}
