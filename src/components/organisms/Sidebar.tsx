import SidebarSection from "../molecules/SidebarSection";
import LogoutButton from "../molecules/LogoutButton";


const Sidebar = () => {
  const homeMenuItems = [
    { label: "Overview", onClick: () => {}, isActive: false },
  ];

  const adminMenuItems = [
    { label: "Return Uniform", onClick: () => {}, isActive: false },
    { label: "Register New Inventory", onClick: () => {}, isActive: true },
    { label: "Delete Inventory", onClick: () => {}, isActive: false },
    { label: "Delete Reasons", onClick: () => {}, isActive: false },
    { label: "Reports", onClick: () => {}, isActive: false },
    { label: "Unit/Wing", onClick: () => {}, isActive: false },
    { label: "Configure Data Retention Period", onClick: () => {}, isActive: false },
  ];

  const userMenuItems = [
    { label: "Auto Measurement", onClick: () => {}, isActive: false },
    { label: "Manual Measurement Entry", onClick: () => {}, isActive: false },
    { label: "Draw Uniform", onClick: () => {}, isActive: false },
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
        <LogoutButton onClick={() => alert("Log out")} > Log Out </LogoutButton>
      </div>
    </div>
  );
};

export default Sidebar;
