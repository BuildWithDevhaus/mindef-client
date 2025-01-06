import React, { useEffect, useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReasonInputSchema } from "../../zod/reason";
import { useReason } from "../../hooks/useReason";
import { useNavigate, useParams } from "react-router-dom";
import { toastAlert } from "../../helpers/toastAlert";

const AdminEditDeleteReason: React.FC = () => {
    const [reason, setReason] = useState<ReasonInputSchema>({
      name: "",
    });
    
    const { updateReason, findReason, selectedReason } = useReason();
    const { deleteReasonId } = useParams();
    const navigate = useNavigate();
    
  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
    { label: "Edit Reason" },
  ];

      useEffect(() => {
        if (deleteReasonId) findReason(deleteReasonId as string);        
      }, [deleteReasonId]);
      
      useEffect(() => {
        if (selectedReason) {
          setReason(selectedReason);
        }        
      }, [selectedReason]);

    const handleButtonClick = () => {
    if (reason.name.trim()) {
      updateReason(deleteReasonId as string, reason);
      navigate("/admin/delete-reasons", {
        state: { toastMessage: `Reason for deletion has been updated to "${reason.name}"` },
      });
    } else {
      toastAlert( "error", "Please enter a reason");
    }
  };

  return (
    <AdminLayout headingText="Delete Reasons" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Edit Reason for Delete Inventory</h2>
      </div>
      <div className="flex flex-col items-end gap-8">
        <InputFieldPrimary
          className="text-lg text-left"
          placeholder="(edit reason for deletion here)"
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

export default AdminEditDeleteReason;
