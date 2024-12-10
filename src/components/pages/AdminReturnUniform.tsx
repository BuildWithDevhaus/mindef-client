import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import AdminReturnUniformForm from "../organisms/AdminReturnUniformForm";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";


const AdminReturn: React.FC = () => {

  const navigate = useNavigate();
  const { resetStep, nextStep } = useStep();

  const handleReturnUniformBreadcrumb = () => {
    navigate("/admin/return-uniform");
    resetStep();
    nextStep("admin-return-uniform-scan-rfid");
  };

  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Return Uniform", onClick: handleReturnUniformBreadcrumb },
  ];

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