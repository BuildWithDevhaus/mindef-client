import { forwardRef } from "react";
import clsx from "clsx";



const InputFieldPrimary = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder, value, onChange, className, ...rest }, ref) => {
    return (
      <input
        type="text"
        className={clsx(
          "text-[36px] w-full py-4 px-4 border bg-[#F5F5F5] border-[#B7B7B7] rounded-lg shadow-md focus:outline-none focus:border-[#2F6D57]",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        {...rest} 
      />
    );
  }
);

export default InputFieldPrimary;
