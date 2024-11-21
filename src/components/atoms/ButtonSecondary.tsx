import React from "react";
import clsx from "clsx";

const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={clsx(`bg-[#ffffff] text-[#344054] hover:bg-[#ebebeb] font-semibold py-2 px-4 border-solid border-2 border-[#2F6D57] rounded-xl ${
        disabled
          ? "disabled:opacity-50 hover:bg-[#ffffff] cursor-not-allowed"
          : ""
      }`, className)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
