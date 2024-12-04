import { useLocation, useNavigate } from "react-router-dom";
import SidebarSection from "../molecules/SidebarSection";
import LogoutButton from "../molecules/LogoutButton";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/admin/login");
    window.location.reload();
  };

  const homeMenuItems = [
    {
      label: "Overview",
      onClick: () => navigate("/admin"),
      isActive: location.pathname === "/admin",
    },
  ];

  const adminMenuItems = [
    {
      label: "Return Uniform",
      onClick: () => navigate("/admin/return-uniform"),
      isActive: location.pathname === "/admin/return-uniform",
    },
    {
      label: "Register New Inventory",
      onClick: () => navigate("/admin/register-inventory"),
      isActive: location.pathname === "/admin/register-inventory",
    },
    {
      label: "Delete Inventory",
      onClick: () => navigate("/admin/delete-inventory"),
      isActive: location.pathname === "/admin/delete-inventory",
    },
    {
      label: "Delete Reasons",
      onClick: () => navigate("/admin/delete-reasons"),
      isActive: location.pathname === "/admin/delete-reasons",
    },
    {
      label: "Reports",
      onClick: () => navigate("/admin/reports"),
      isActive:
        location.pathname === "/admin/reports" ||
        location.pathname === "/admin/reports/monthly-report" ||
        location.pathname === "/admin/reports/Yearly-report",
    },
    {
      label: "Unit/Wing",
      onClick: () => navigate("/admin/unit-wing"),
      isActive: location.pathname === "/admin/unit-wing",
    },
    {
      label: "Configure Data Retention Period",
      onClick: () => navigate("/admin/configure-data-retention"),
      isActive: location.pathname === "/admin/configure-data-rentention",
    },
  ];

  const userMenuItems = [
    { label: "Auto Measurement", onClick: () => navigate("/admin/auto-measurement"), isActive: location.pathname === "/admin/auto-measurement" },
    { label: "Manual Measurement Entry", onClick: () => navigate("/admin/manual-measurement"), isActive: location.pathname === "/admin/manual-measurement" },
    { label: "Draw Uniform", onClick: () => navigate("/admin/draw-uniform"), isActive: location.pathname === "/admin/draw-uniform" },
  ];

  return (
    <div className="w-80 h-screen bg-sidebar-bg bg-cover border-r border-gray-300 flex flex-col justify-between fixed top-0 left-0">
      <div>
        <div className="h-[15%]"></div>
        <SidebarSection title="Home" items={homeMenuItems} />
        <SidebarSection title="Admin Menu" items={adminMenuItems} />
        <SidebarSection title="User Menu" items={userMenuItems} />
      </div>
      <div className="flex items-center justify-around bottom-0 p-4">
        <LogoutButton onClick={handleLogout}> Log Out </LogoutButton>
      </div>
    </div>
  );
};

export default Sidebar;
