import React, { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-[#2F6D57] hover:bg-[#073826] text-white font-semibold py-2 px-4 border-solid border-2 border-[#2F6D57] rounded-xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
