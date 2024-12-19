import React, { useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReasonInputSchema } from "../../zod/reason";
import { useReason } from "../../hooks/useReason";

const AdminAddDeleteReason: React.FC = () => {
    const [reason, setReason] = useState<ReasonInputSchema>({
      name: "",
    });

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
    { label: "Add Reason" },
  ];

const { createReason } = useReason();
  
  const handleButtonClick = () => {
    if (reason.name.trim()) {
      createReason(reason);
      toast.success(`Reason added: ${reason.name}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReason({ name: "" });
    } else {
      toast.error("Please enter a reason", {
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
    <AdminLayout headingText="Delete Reasons" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Add Reason for Delete Inventory</h2>
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
