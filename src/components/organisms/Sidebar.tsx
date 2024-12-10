import { useLocation, useNavigate } from "react-router-dom";
import SidebarSection from "../molecules/SidebarSection";
import LogoutButton from "../molecules/LogoutButton";
import { useStep } from "../../hooks/useStep";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const { nextStep, resetStep } = useStep();

  const handleReturnUniform = () => {
    navigate("/admin/return-uniform");
    resetStep();
    nextStep("admin-return-uniform-scan-rfid");
  };

  const handleAutoMeasurement = () => {
    navigate("/admin/auto-measurement");
    resetStep();
    nextStep("activity-auto-measurement-uniform-type");
  };

  const handleManualMeasurement = () => {
    navigate("/admin/manual-measurement");
    resetStep();
    nextStep("activity-manual-measurement-uniform-type");
  }

  const handleDrawUniform = () => {
    navigate("/admin/draw-uniform");
    resetStep();
    nextStep("activity-draw-uniform-scan-rfid");
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    logout();
    navigate("/admin/login", { replace: true });
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
      onClick: () => (handleReturnUniform()),
      isActive: location.pathname === "/admin/return-uniform",
    },
    {
      label: "Register New Inventory",
      onClick: () => navigate("/admin/register-inventory"),
      isActive:
        location.pathname === "/admin/register-inventory" ||
        location.pathname === "/admin/register-inventory/add",
    },
    {
      label: "Delete Inventory",
      onClick: () => navigate("/admin/delete-inventory"),
      isActive: 
        location.pathname === "/admin/delete-inventory" ||
        location.pathname === "/admin/delete-inventory/add",
    },
    {
      label: "Delete Reasons",
      onClick: () => navigate("/admin/delete-reasons"),
      isActive: 
        location.pathname === "/admin/delete-reasons" ||
        location.pathname === "/admin/delete-reasons/add",
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
      isActive: location.pathname === "/admin/unit-wing" || location.pathname === "/admin/unit-wing/add",
    },
    {
      label: "Configure Data Retention Period",
      onClick: () => navigate("/admin/configure-data-retention"),
      isActive: location.pathname === "/admin/configure-data-retention",
    },
  ];

  const userMenuItems = [
    { label: "Auto Measurement", onClick: () => {handleAutoMeasurement()}, isActive: location.pathname === "/admin/auto-measurement" },
    { label: "Manual Measurement Entry", onClick: () => {handleManualMeasurement()}, isActive: location.pathname === "/admin/manual-measurement" },
    { label: "Draw Uniform", onClick: () => {handleDrawUniform()}, isActive: location.pathname === "/admin/draw-uniform" },
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
