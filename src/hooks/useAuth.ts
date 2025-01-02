import { useState } from "react";


const DEFAULT_PIN = "7654321";

const useAuth = (): UseAuth => {
  const storedPin = localStorage.getItem("pin");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
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

  const isPinValid = (pin: string) => {
    const validPin = storedPin || DEFAULT_PIN;
    return pin === validPin;
  };

  return { isAuthenticated, login, logout, isPinValid };
};

export default useAuth;
