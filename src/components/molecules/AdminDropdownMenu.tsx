import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownItem from "../atoms/AdminDropdownItem";
import IconGear from "../atoms/IconGear"; 
import IconKey from "../atoms/IconKey";


const AdminDropdownMenu: React.FC<AdminDropdownMenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    navigate("/admin/login");
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 font-semibold text-[#5E6875] rounded-md"
      >
        {userName} <span>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <DropdownItem
            icon={<IconGear />}
            label="Settings"
            onClick={() => console.log("Settings Clicked")}
          />
          <div className="border-t border-gray-300"></div>
          <DropdownItem
            icon={<IconKey />}
            label="Logout"
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDropdownMenu;
