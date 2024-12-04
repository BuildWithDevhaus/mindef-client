import { useState } from "react";

interface UseAuth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
