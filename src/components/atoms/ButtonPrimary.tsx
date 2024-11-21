import React from "react";
import clsx from "clsx";

const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className
}) => {
  return (
    <button
      className={clsx(`bg-[#2F6D57] hover:bg-[#073826] text-white font-semibold py-2 px-4 border-solid border-2 border-[#2F6D57] rounded-xl ${
        disabled
          ? "disabled:opacity-50 hover:bg-[#2F6D57] cursor-not-allowed"
          : ""
      }`, className)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
