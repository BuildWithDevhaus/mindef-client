import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import AdminDeleteInventoryForm from "../organisms/AdminDeleteInventoryForm";

const AdminAddDeleteInventory: React.FC = () => {

  const { resetStep, nextStep } = useStep();
  const navigate = useNavigate();

  const handleDeleteUniformBreadcrumb = () => {
    navigate("/admin/delete-inventory/add");
    resetStep();
    nextStep("admin-delete-uniform-scan-rfid");
  };

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Inventory", url: "/admin/delete-inventory" },
    { label: "Delete Uniform", onClick: handleDeleteUniformBreadcrumb },
  ];

  useEffect(() => {
    nextStep("admin-delete-uniform-scan-rfid");
  }, [])
  

  return (
    <AdminLayout headingText="Delete Inventory" breadcrumbItems={breadcrumbItems}>
      <AdminDeleteInventoryForm />
    </AdminLayout>
  );
};

export default AdminAddDeleteInventory;