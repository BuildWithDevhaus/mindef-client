import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import AdminEditRegisteredUniformForm from "../organisms/AdminEditRegisteredUniformForm";
import { getCurrentSlug } from "../../helpers/windows";

const AdminEditRegisteredInventory: React.FC = () => {

  const { resetStep, nextStep } = useStep();
  const navigate = useNavigate();

  const handleEditRegisteredUniformBreadcrumb = () => {
    navigate(`${getCurrentSlug()}`);
    resetStep();
    nextStep("admin-edit-registered-uniform-form-details");
  };

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Register New Inventory", url: "/admin/register-inventory" },
    { label: "Edit Registered Uniform", onClick: handleEditRegisteredUniformBreadcrumb },
  ];

  useEffect(() => {
    nextStep("admin-edit-registered-uniform-form-details");
  }, [])
  

  return (
    <AdminLayout headingText="Edit Details of Registered Uniform" breadcrumbItems={breadcrumbItems}>
      <AdminEditRegisteredUniformForm />
    </AdminLayout>
  );
};

export default AdminEditRegisteredInventory;