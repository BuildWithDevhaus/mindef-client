import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { login, isPinValid, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin"); 
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (pin.length === 7) {
      handleLogin();
    }
  }, [pin]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        setActiveKey(event.key);
        handleNumberInput(event.key);
      } else if (event.key === "Backspace") {
        setPin((prev) => prev.slice(0, -1));
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pin]);

  const handleLogin = () => {
    const storedPin = localStorage.getItem("pin") || "7654321";
    console.log("Validating PIN:", storedPin);

    if (isPinValid(pin)) {
      console.log("PIN is valid, logging in...");
      login();
      window.location.reload();
    } else {
      alert("Invalid PIN");
      setPin("");
      setActiveKey(null);
    }
  };

  const handleNumberInput = (number: string) => {
    if (pin.length < 7) {
      setPin((prev) => prev + number);
    }
  };

  const handleNumberClick = (number: string) => {
    setActiveKey(number);
    handleNumberInput(number);
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleEditPin = () => {
    localStorage.removeItem("pin");
    alert("PIN reset to default");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-5xl font-bold mb-6">Login to your account</h1>
      <p className="text-gray-500 mb-6">Enter PIN</p>

      <div className="flex space-x-4 mb-[52px]">
        {[...Array(7)].map((_, idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full ${
              idx < pin.length ? "bg-[#2F6D57]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`w-16 h-16 rounded-full text-lg font-semibold focus:outline-none transition-transform duration-200 ${
              activeKey === num.toString()
                ? "bg-[#2F6D57] text-white scale-105"
                : "bg-gray-100 hover:bg-[#90D7BE]"
            }`}
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </button>
        ))}
        <div></div>
        <button
          className={`w-16 h-16 rounded-full text-lg font-semibold focus:outline-none transition-transform duration-200 ${
            activeKey === "0"
              ? "bg-[#2F6D57] text-white scale-105"
              : "bg-gray-100 hover:bg-[#90D7BE]"
          }`}
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <div></div>
      </div>

      <div className="mt-[80px] text-sm text-gray-500">
        Forgot your PIN?{" "}
        <a onClick={handleEditPin} className="text-blue-500 underline cursor-pointer">
        Reset PIN code 
        </a>
      </div>

      <footer className="absolute bottom-4 text-gray-400 text-xs">
        © 2024 Orion5
      </footer>
    </div>
  );
};

export default AdminLogin;
