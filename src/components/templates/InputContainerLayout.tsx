import React from "react";



const InputContainerLayout: React.FC<InputLayoutProps> = ({ children, label, title, variant = "default" }) => {
  const isSmall = variant === "small";

  return (
    <div className={`flex flex-col ${isSmall ? "gap-3" : "gap-5"}`}>
      <p className={`font-semibold ${isSmall ? "text-xl" : "text-2xl"}`}>{title}</p>
      <div className={`flex justify-between items-center gap-4 ${isSmall ? "gap-3" : ""}`}>
        <div className={`${isSmall ? "min-w-24" : "min-w-28"}`}>
          <label htmlFor="dropdown" className={`font-medium ${isSmall ? "text-md" : "text-lg"}`}>
            {label}
          </label>
        </div>
        {children}
      </div>
    </div>
  );
};

export default InputContainerLayout;
