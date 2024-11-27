import React, { useState } from "react";
import DropdownItem from "../atoms/DropdownItem";
import IconGear from "../atoms/IconGear"; // Import the gear icon
import IconKey from "../atoms/IconKey"; // Import the key icon

interface DropdownMenuProps {
  userName: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md"
      >
        {userName} <span>▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {/* Dropdown Items */}
          <DropdownItem
            icon={<IconGear />} // Use the gear icon
            label="Settings"
            onClick={() => console.log("Settings Clicked")}
          />
          <DropdownItem
            icon={<IconKey />} // Use the key icon
            label="Logout"
            onClick={() => console.log("Logout Clicked")}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
