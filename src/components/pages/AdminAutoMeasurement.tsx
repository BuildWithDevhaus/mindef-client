import React from "react";
import AdminLayout from "../templates/AdminLayout";

const AdminAutoMeasurement: React.FC = () => {
  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Auto Measurement", url: "/admin/auto-measurement" },
  ];

  return (
    <AdminLayout headingText="Auto Measurement" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <h1 className="text-6xl font-bold">Place Holder</h1>
        <h2 className="text-3xl">Lorem Ipsum naga bonar tsuba duragon :</h2>
      </div>
    </AdminLayout>
  );
};

export default AdminAutoMeasurement;
