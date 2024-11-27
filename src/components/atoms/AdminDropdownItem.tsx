import React from "react";

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex font-semibold text-[#667085] items-center gap-3 p-4 hover:bg-gray-100 rounded-md w-full text-left"
  >
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </button>
);

export default DropdownItem;
