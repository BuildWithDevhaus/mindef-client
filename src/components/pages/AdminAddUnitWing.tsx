import React, { useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDivision } from "../../hooks/useDivision";
import { DivisionInputSchema } from "../../zod/division";

const AdminAddUnitWing: React.FC = () => {
  const [division, setDivision] = useState<DivisionInputSchema>({
    name: "",
  });

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Unit/Wing", url: "/admin/unit-wing" },
    { label: "Add Unit/Wing" },
  ];

  const { createDivision } = useDivision();

  const handleButtonClick = () => {
    if (division.name.trim()) {
      createDivision(division);
      toast.success(`Unit/wing added: ${division.name}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDivision({ name: "" });
    } else {
      toast.error("Please enter a unit/wing", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
            value={division.name}
            onChange={(e) =>
              setDivision((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <ButtonPrimary onClick={handleButtonClick}>Confirm</ButtonPrimary>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminAddUnitWing;

