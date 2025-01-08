import React from "react";

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, onClick, className }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex font-semibold text-[#667085] items-center gap-3 p-4 hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-300 rounded-md w-full text-left transition-all duration-150 ease-in-out ${className}`}
      tabIndex={0} // Enables keyboard focus
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default DropdownItem;
