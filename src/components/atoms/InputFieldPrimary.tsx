import React from "react";
import clsx from "clsx";
import { InputFieldProps } from "../../types/input";

const InputFieldPrimary: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type="text"
      className={clsx("text-center text-align-center text-[36px] w-full py-4 px-4 border bg-[#F5F5F5] border-[#B7B7B7] rounded-lg shadow-md focus:outline-none focus:border-[#2F6D57]", className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputFieldPrimary;
