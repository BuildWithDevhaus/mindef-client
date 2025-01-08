import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUnitWing } from "../../hooks/useUnitWing";
import { UnitWingInputSchema } from "../../zod/unitWing";
import { useNavigate, useParams } from "react-router-dom";
import { toastAlert } from "../../helpers/toastAlert";

const AdminEditUnitWing: React.FC = () => {
  const [unitWing, setUnitWing] = useState<UnitWingInputSchema>({
    name: "",
  });

  const { updateUnitWing, findUnitWing, selectedUnitWing } = useUnitWing();
  const { unitWingId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Unit/Wing", url: "/admin/unit-wing" },
    { label: "Edit Unit/Wing" },
  ];

  useEffect(() => {
    if (unitWingId) findUnitWing(unitWingId as string);
  }, [unitWingId]);

  useEffect(() => {
    if (selectedUnitWing) {
      setUnitWing(selectedUnitWing);
    }
  }, [selectedUnitWing]);

  const handleButtonClick = () => {
    if (unitWing.name.trim()) {
      updateUnitWing(unitWingId as string, unitWing);
      navigate("/admin/unit-wing", {
        state: {
          toastMessage: `The Unit/Wing "${unitWing.name}" has been updated.`,
        },
      });
    } else {
      toastAlert("error", "Please enter a unit/wing");
    }
  };

  return (
    <AdminLayout headingText="Unit/Wing" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Edit Unit/Wing</h2>
      </div>
      <div className="flex flex-col items-end gap-8">
        <InputFieldPrimary
          className="text-lg text-left"
          placeholder="(edit Unit/Wing)"
          value={unitWing.name}
          ref={inputRef}
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

export default AdminEditUnitWing;
