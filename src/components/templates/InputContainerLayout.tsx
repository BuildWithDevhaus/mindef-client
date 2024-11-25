import React from "react";

const InputContainerLayout: React.FC<InputLayoutProps> = ({ children, label, title }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-2xl">{title}</p>
      <div className="flex justify-between items-center gap-4">
        <div className="min-w-28">
          <label htmlFor="dropdown" className="font-medium text-lg">
            {label}
          </label>
        </div>
        {children}
      </div>
    </div>
  );
};

export default InputContainerLayout;
