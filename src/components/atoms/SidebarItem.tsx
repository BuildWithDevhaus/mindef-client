import React from "react";

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick, isActive }) => (
  <div
    className={`cursor-pointer px-6 py-2 text-sm ${
      isActive ? "bg-[#387545] font-semibold text-[#ffffff] hover:text-[#ffffff]" : "text-[#5E6875] "
    } hover:text-[#5E6875] hover:font-semibold`}
    onClick={onClick}
  >
    {label}
  </div>
);

export default SidebarItem;
