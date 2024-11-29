import React from "react";
import AdminLayout from "../templates/AdminLayout";

const AdminReturn: React.FC = () => {
  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Return Uniform", url: "/admin/return-uniform" },
  ];

  return (
    <AdminLayout headingText="Return Uniform" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <h1 className="text-6xl font-bold">Scan RFID</h1>
        <h2 className="text-3xl">Please scan using the RFID Scanner :</h2>
      </div>
    </AdminLayout>
  );
};

export default AdminReturn;
