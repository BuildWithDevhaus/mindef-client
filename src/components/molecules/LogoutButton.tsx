import React from "react";
import IconLogout from "../atoms/IconLogout";

const LogoutButton: React.FC<LogoutButtonProps> = ({ children, onClick, className }) => {
  return (
    <div className="w-full border-t border-[#344054] pt-4">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors hover:font-semibold ${className}`}
      >
        <span className="ml-2">{children}</span>
        <IconLogout />
      </button>
    </div>
  );
};

export default LogoutButton;
