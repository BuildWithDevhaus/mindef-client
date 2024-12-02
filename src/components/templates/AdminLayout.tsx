import React from "react";
import Sidebar from "../organisms/Sidebar";
import Breadcrumb from "../atoms/Breadcrumb";
import AdminDropdownMenu from "../molecules/AdminDropdownMenu";

const AdminLayout: React.FC<AdminTemplateProps> = ({
  children,
  headingText,
  subText,
  breadcrumbItems,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full ml-80">
        <header className="sticky top-0 bg-white z-10 py-8">
          <div className="flex items-center justify-between py-6 px-10"> 
            <Breadcrumb items={breadcrumbItems} />
            <AdminDropdownMenu userName="John Doe" />
          </div>
        </header>
        <main className="flex flex-col flex-grow px-10 overflow-y-auto">
          <div className="mb-8">
            <div className="mb-5 flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#101828]">{headingText}</h1>
              {subText && (
                <p
                  className="text-[#667085] text-lg"
                  dangerouslySetInnerHTML={{ __html: subText }}
                ></p>
              )}
            </div>
            <div className="border-b border-[#EAECF0]"></div>
          </div>
          <div className="flex-grow">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
