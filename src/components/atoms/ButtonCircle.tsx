import React from "react";

const ButtonCircle: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`relative shadow-md p-16 w-40 h-40 rounded-full bg-[#2F6D57] text-white font-semibold flex items-center justify-center transition-all duration-300 hover:bg-[#073826] active:scale-105 ${
        disabled ? "disabled:opacity-10 hover:bg-[#2F6D57] cursor-not-allowed" : ""
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonCircle;
