import React from "react";
import clsx from "clsx";

const SelectOptionPrimary = React.forwardRef<
  HTMLSelectElement,
  SelectOptionProps
>(({ placeholder, value, onChange, className, children }, ref) => {
  return (
    <div className="relative w-full">
      <select
        id="dropdown"
        ref={ref}
        value={value}
        onChange={onChange}
        className={clsx(
          "text-[36px] w-full py-4 px-4 border bg-[#F5F5F5] border-[#B7B7B7] rounded-lg shadow-md appearance-none focus:outline-none focus:border-[#2F6D57] bg-no-repeat bg-[length:60px] bg-[right_16px_center]",
          className
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='%23B7B7B7' d='M7 10l5 5 5-5z'/></svg>\")",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
});

SelectOptionPrimary.displayName = "SelectOptionPrimary";

export default SelectOptionPrimary;
