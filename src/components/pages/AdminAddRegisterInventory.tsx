import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import AdminRegisterNewUniformForm from "../organisms/AdminRegisterNewUniformForm";
import { ToastContainer } from "react-toastify";

const AdminAddRegisterInventory: React.FC = () => {

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
    nextStep("admin-register-new-uniform-scan-rfid");
  }, [])
  
  return (
    <AdminLayout headingText="Register New Uniform" breadcrumbItems={breadcrumbItems}>
      <AdminRegisterNewUniformForm />
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminAddRegisterInventory;