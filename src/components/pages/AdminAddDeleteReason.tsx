import React, { useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReasonInputSchema } from "../../zod/reason";
import { useReason } from "../../hooks/useReason";
import { useNavigate } from "react-router-dom";
import { toastAlert } from "../../helpers/toastAlert";

const AdminAddDeleteReason: React.FC = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState<ReasonInputSchema>({
    name: "",
  });

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
    { label: "Add Reason" },
  ];

  const { createReason } = useReason();

  const handleButtonClick = async () => {
    if (reason.name.trim()) {
      try {
        await createReason(reason);
        navigate("/admin/delete-reasons", {
          state: { toastMessage: `The Delete Reason "${reason.name}" has been added.` },
        });
      } catch (error) {
        toastAlert("error", "A reason with that name already exists. Please enter a different name.");
      }
    } else {
      toastAlert("error", "Please enter a reason");
    }
  };
  return (
    <AdminLayout headingText="Delete Reasons" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">
          Add Reason for Delete Inventory
        </h2>
      </div>
      <div className="flex flex-col items-end gap-8">
        <InputFieldPrimary
          className="text-lg text-left"
          placeholder="(Write new reason for deletion here)"
          value={reason.name}
          onChange={(e) =>
            setReason((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <ButtonPrimary onClick={handleButtonClick}>Confirm</ButtonPrimary>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminAddDeleteReason;
