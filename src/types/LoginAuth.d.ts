interface AdminLoginProps {
  onLogin: () => void;
}

interface UseAuth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isPinValid: (pin: string) => boolean;
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  element: JSX.Element;
}
