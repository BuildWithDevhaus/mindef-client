import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import ActivityAutoMeasurement from "../organisms/ActivityAutoMeasurement";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AdminAutoMeasurement: React.FC = () => {

  const navigate = useNavigate();
  const { resetStep, nextStep } = useStep();


  const handleAutoMeasurementBreadcrumb = () => {
    navigate("/admin/auto-measurement");
    resetStep();
    nextStep("activity-auto-measurement-uniform-type");
  };

  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Auto Measurement", onClick: handleAutoMeasurementBreadcrumb },
  ];


  useEffect(() => {
    nextStep('activity-auto-measurement-uniform-type')
  }, []);

  return (
    <AdminLayout headingText="Auto Measurement" breadcrumbItems={breadcrumbItems}>
      <div className="py-10 h-full">
        <ActivityAutoMeasurement />
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminAutoMeasurement;
