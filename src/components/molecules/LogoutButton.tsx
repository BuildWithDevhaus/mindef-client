import React from "react";
import IconLogout from "../atoms/IconLogout";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const LogoutButton: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <div className="w-full border-t border-gray-300 pt-4">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors ${className}`}
      >
        <span className="ml-2">{children}</span>
        <IconLogout />
      </button>
    </div>
  );
};

export default LogoutButton;
