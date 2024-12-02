import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import ActivityManualMeasurement from "../organisms/ActivityManualMeasurement";
import { useStep } from "../../hooks/useStep";

const AdminManualMeasurement: React.FC = () => {
  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Manual Measurement", url: "/admin/manual-measurement" },
  ];

  const { nextStep } = useStep();

  useEffect(() => {
    nextStep('activity-manual-measurement-uniform-type')
  }, []);

  return (
    <AdminLayout headingText="Manual Measurement" breadcrumbItems={breadcrumbItems}>
      <div className="py-10 h-full">
        <ActivityManualMeasurement />
      </div>
    </AdminLayout>
  );
};

export default AdminManualMeasurement;
