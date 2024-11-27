import React from "react";

interface DropdownItemProps {
  icon?: React.ReactNode;
  label: string;       
  onClick: () => void;    
}

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full text-left"
  >
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </button>
);

export default DropdownItem;
