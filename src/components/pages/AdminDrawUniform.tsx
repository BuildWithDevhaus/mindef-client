import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import ActivityDrawUniform from "../organisms/ActivityDrawUniform";
import { useStep } from "../../hooks/useStep";

const AdminDrawUniform: React.FC = () => {
  const breadcrumbItems = [
    { label: "User Menu"},
    { label: "Draw Uniform", url: "/admin/draw-uniform" },
  ];

  const { nextStep } = useStep();

  useEffect(() => {
    nextStep('activity-draw-uniform-scan-rfid')
  }, []);

  return (
    <AdminLayout headingText="Draw Uniform" breadcrumbItems={breadcrumbItems}>
      <div className="py-10 h-full">
        <ActivityDrawUniform />
      </div>
    </AdminLayout>
  );
};

export default AdminDrawUniform;
