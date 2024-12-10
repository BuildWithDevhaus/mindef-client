interface AdminLoginProps {
  onLogin: () => void;
}

interface UseAuth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  element: JSX.Element;
}