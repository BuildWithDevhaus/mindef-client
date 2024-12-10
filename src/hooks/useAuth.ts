import { useState } from "react";

const useAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Retrieve the authentication state from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
