import React, { useEffect, useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import InputFieldPrimary from "../atoms/InputFieldPrimary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReasonInputSchema } from "../../zod/reason";
import { useReason } from "../../hooks/useReason";
import { useParams } from "react-router-dom";

const AdminEditDeleteReason: React.FC = () => {
    const [reason, setReason] = useState<ReasonInputSchema>({
      name: "",
    });
    
    const { updateReason, findReason, selectedReason } = useReason();
    const { deleteReasonId } = useParams();
    
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

  
  //TODO: upon success redirect to the main table and show toaster
  const handleButtonClick = () => {
    if (reason.name.trim()) {
      updateReason(deleteReasonId as string, reason);
      toast.success(`Reason Edited: ${reason.name}`, {
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
