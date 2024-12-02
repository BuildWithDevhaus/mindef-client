import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import ActivityAutoMeasurement from "../organisms/ActivityAutoMeasurement";
import { useStep } from "../../hooks/useStep";

const AdminAutoMeasurement: React.FC = () => {
  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Auto Measurement", url: "/admin/auto-measurement" },
  ];

  const { nextStep } = useStep();

  useEffect(() => {
    nextStep('activity-auto-measurement-uniform-type')
  }, []);

  return (
    <AdminLayout headingText="Auto Measurement" breadcrumbItems={breadcrumbItems}>
      <div className="py-10 h-full">
        <ActivityAutoMeasurement />
      </div>
    </AdminLayout>
  );
};

export default AdminAutoMeasurement;
