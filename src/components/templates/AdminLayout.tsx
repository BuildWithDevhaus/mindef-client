import React from "react";
import Sidebar from "../organisms/Sidebar";
import Breadcrumb from "../atoms/Breadcrumb";
import AdminDropdownMenu from "../molecules/AdminDropdownMenu";

interface BreadcrumbItem {
    label: string;
    url?: string; 
  }

interface AdminTemplateProps {
  children: React.ReactNode;
  headingText: string;
  breadcrumbItems: BreadcrumbItem[];
}

const AdminLayout: React.FC<AdminTemplateProps> = ({ children, headingText, breadcrumbItems }) => {
  return (
    <div className="mx-auto flex">
      <Sidebar />
      <div className="w-full mt-10 mx-auto px-10 ml-80">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between py-2">
            <Breadcrumb
              items={breadcrumbItems}
            />
            <AdminDropdownMenu userName="John Doe" />
          </div>
        </div>
        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold text-[#101828] mb-5">
            {headingText}
          </h1>
          <div className="border-b border-[#EAECF0]"></div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
