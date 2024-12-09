import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import AdminReturnUniformForm from "../organisms/AdminReturnUniformForm";
import { useStep } from "../../hooks/useStep";


const AdminReturn: React.FC = () => {
  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Return Uniform", url: "/admin/return-uniform" },
  ];

  const { nextStep } = useStep();

  useEffect(() => {
    nextStep("admin-return-uniform-scan-rfid");
  }, [])
  

  return (
    <AdminLayout headingText="Return Uniform" breadcrumbItems={breadcrumbItems}>
      <AdminReturnUniformForm />
    </AdminLayout>
  );
};

export default AdminReturn;