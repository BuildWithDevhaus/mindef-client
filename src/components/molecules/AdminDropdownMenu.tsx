import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DropdownItem from "../atoms/AdminDropdownItem";
import IconGear from "../atoms/IconGear";
import IconKey from "../atoms/IconKey";
import useAuth from "../../hooks/useAuth";

interface AdminDropdownMenuProps {
  userName: string;
}

const AdminDropdownMenu: React.FC<AdminDropdownMenuProps> = ({ userName }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Edit Pin", icon: <IconGear />, action: () => handleEditPin() },
    { label: "Logout", icon: <IconKey />, action: () => handleLogout() },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleEditPin = () => {
    closeDropdown();
    navigate("/admin/edit-pin", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    logout();
    navigate("/admin/login", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          closeDropdown();
          break;

        case "ArrowDown":
          setFocusedIndex((prev) => (prev + 1) % menuItems.length);
          break;

        case "ArrowUp":
          setFocusedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
          break;

        case "Enter":
          if (focusedIndex >= 0 && focusedIndex < menuItems.length) {
            menuItems[focusedIndex].action();
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 font-semibold text-[#5E6875] rounded-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userName} <span>▼</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          role="menu"
        >
          {menuItems.map((item, index) => (
            <DropdownItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={item.action}
              className={`px-4 py-2 ${
                focusedIndex === index
                  ? "bg-gray-100 text-blue-600"
                  : "text-gray-700"
              }`}
              role="menuitem"
              tabIndex={focusedIndex === index ? 0 : -1}
              onFocus={() => setFocusedIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDropdownMenu;
