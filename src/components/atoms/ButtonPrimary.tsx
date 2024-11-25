import React from "react";
import clsx from "clsx";

const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  variant = "default",
}) => {
  const renderSize = variant === "default" ? "text-[13px] py-[10px] px-5 rounded-md" : "text-[26px] px-10 py-5 rounded-xl";

  return (
    <button
      className={clsx(`bg-[#2F6D57] hover:bg-[#073826] text-white font-semibold border-solid border-2 border-[#2F6D57] ${renderSize} ${
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
