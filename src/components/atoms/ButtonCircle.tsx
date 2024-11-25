import React from "react";
import clsx from "clsx";

const ButtonCircle: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className
}) => {
  return (
    <button
      className={clsx(`relative shadow-md p-16 w-[300px] h-[300px] rounded-full bg-[#2F6D57] text-white text-3xl font-semibold flex items-center justify-center transition-all duration-300 hover:bg-[#073826] active:scale-105 ${
        disabled
          ? "disabled:opacity-10 hover:bg-[#2F6D57] cursor-not-allowed"
          : ""
      }`, className)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonCircle;
