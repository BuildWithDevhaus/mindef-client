import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import AdminManualMeasurementForm from "../organisms/AdminManualMeasurementForm";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AdminManualMeasurement: React.FC = () => {

  const navigate = useNavigate();
  const { resetStep, nextStep } = useStep();

  const handleManualMeasurementBreadcrumb = () => {
    navigate("/admin/manual-measurement");
    resetStep();
    nextStep("activity-manual-measurement-uniform-type");
  };

  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Manual Measurement", onClick: handleManualMeasurementBreadcrumb },
  ];


  useEffect(() => {
    nextStep('activity-manual-measurement-gender')
  }, []);

  return (
    <AdminLayout headingText="Manual Measurement" breadcrumbItems={breadcrumbItems}>
      <div className="py-10 h-full">
        <AdminManualMeasurementForm />
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminManualMeasurement;
