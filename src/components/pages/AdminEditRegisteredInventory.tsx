import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import AdminEditRegisteredUniformForm from "../organisms/AdminEditRegisteredUniformForm";

const AdminEditRegisteredInventory: React.FC = () => {

  const { resetStep, nextStep } = useStep();
  const navigate = useNavigate();

  const handleRegisterNewUniformBreadcrumb = () => {
    navigate("/admin/register-inventory/add");
    resetStep();
    nextStep("admin-register-new-uniform-scan-rfid");
  };

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Register New Inventory", url: "/admin/register-inventory" },
    { label: "Register New Uniform", onClick: handleRegisterNewUniformBreadcrumb },
  ];

  useEffect(() => {
    nextStep("admin-edit-registered-uniform-form-details");
  }, [])
  

  return (
    <AdminLayout headingText="Register New Uniform" breadcrumbItems={breadcrumbItems}>
      <AdminEditRegisteredUniformForm />
    </AdminLayout>
  );
};

export default AdminEditRegisteredInventory;