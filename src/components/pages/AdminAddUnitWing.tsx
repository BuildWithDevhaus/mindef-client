import React, { useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUnitWing } from "../../hooks/useUnitWing";
import { UnitWingInputSchema } from "../../zod/unitWing";
import { toastAlert } from "../../helpers/toastAlert";
import { useNavigate } from "react-router-dom";

const AdminAddUnitWing: React.FC = () => {
  const navigate = useNavigate();
  const [unitWing, setUnitWing] = useState<UnitWingInputSchema>({
    name: "",
  });

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Unit/Wing", url: "/admin/unit-wing" },
    { label: "Add Unit/Wing" },
  ];

  const { createUnitWing } = useUnitWing();

  const handleButtonClick = async () => {
    if (unitWing.name.trim()) {
      try {
        await createUnitWing(unitWing);
        navigate("/admin/unit-wing", {
          state: { toastMessage: `The Unit/Wing "${unitWing.name}" has been added.` },
        });
      } catch (error) {
        toastAlert("error", "Failed to add unit/wing");
      }
    } else {
      toastAlert("error", "Please enter a unit/wing");
    }
  };

  return (
    <AdminLayout headingText="Unit/Wing" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Add Unit/Wing</h2>
      </div>
      <div className="flex flex-col items-end gap-8">
          <InputFieldPrimary
            className="text-lg text-left"
            placeholder="(Write new Unit/Wing)"
            value={unitWing.name}
            onChange={(e) =>
              setUnitWing((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <ButtonPrimary onClick={handleButtonClick}>Confirm</ButtonPrimary>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminAddUnitWing;

