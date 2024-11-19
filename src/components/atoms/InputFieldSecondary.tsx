import React from "react";
import clsx from "clsx";
import { InputFieldProps } from "../../types/input";

interface InputFieldSecondaryProps extends InputFieldProps {
  type?: "disabled" | "enabled";
}

const InputFieldSecondary: React.FC<InputFieldSecondaryProps> = ({
  placeholder,
  value,
  onChange,
  className,
  type = "enabled",
}) => {
  const isDisabled = type === "disabled";

  return (
    <input
      type="text"
      className={clsx("text-center text-base w-full py-[10px] px-[14px] border bg-[#FFFFFF] border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2F6D57]", className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
};

export default InputFieldSecondary;
