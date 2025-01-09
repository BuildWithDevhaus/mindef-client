import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminDrawUniformForm from "../organisms/AdminDrawUniformForm";

const AdminDrawUniform: React.FC = () => {


  const navigate = useNavigate();
  const { resetStep, nextStep } = useStep();
  
  const handleDrawUniformBreadcrumb = () => {
    navigate("/admin/draw-uniform");
    resetStep();
    nextStep("activity-draw-uniform-scan-rfid");
  };

  
  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Draw Uniform", onClick: handleDrawUniformBreadcrumb },
  ];


  useEffect(() => {
    nextStep('activity-draw-uniform-scan-rfid')
  }, []);

  return (
    <AdminLayout headingText="Draw Uniform" breadcrumbItems={breadcrumbItems}>
        <AdminDrawUniformForm />
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminDrawUniform;
