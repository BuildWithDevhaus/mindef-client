import React from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonCircle from "../atoms/ButtonCircle";
import { useNavigate } from "react-router-dom";

const AdminReports: React.FC = () => {
  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Reports", url: "/admin/Reports" },
  ];

  const navigate = useNavigate();


  return (
    <AdminLayout headingText="Reports" breadcrumbItems={breadcrumbItems}>
      <div className="flex items-center justify-between mb-36">
        <h2 className="text-2xl font-bold text-[#101828]">Please Select Which Report to View</h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-20 h-full items-center">
          <ButtonCircle onClick={() => {navigate('/admin/reports/monthly-report') }} >Monthly Report</ButtonCircle>
          <ButtonCircle onClick={() => {navigate('/admin/reports/yearly-report') }}>Yearly Report </ButtonCircle>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
