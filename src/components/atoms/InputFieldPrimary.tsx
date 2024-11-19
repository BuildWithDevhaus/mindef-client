import React from "react";

interface InputFieldPrimaryProps {
  placeholder: string;
  className?: string;
}

const InputFieldPrimary: React.FC<InputFieldPrimaryProps> = ({
  placeholder,
  className,
}) => {
  return (
    <input
      type="text"
      className={`text-center text-align-center text-[36px] w-full py-4 px-4 border bg-[#F5F5F5] border-[#B7B7B7] rounded-lg shadow-md focus:outline-none focus:border-[#2F6D57] ${className}`}
      placeholder={placeholder}
    />
  );
};

export default InputFieldPrimary;
