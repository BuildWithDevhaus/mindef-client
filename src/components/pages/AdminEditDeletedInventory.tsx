import React, { useEffect, useState } from "react";
import AdminLayout from "../templates/AdminLayout";
import ContainerLayout from "../templates/ContainerLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import SelectOptionPrimary from "../molecules/SelectOptionPrimary";
import { useReason } from "../../hooks/useReason";
import { useRemarkedShirt } from "../../hooks/useRemarkedShirt";
import { useNavigate, useParams } from "react-router-dom";
import { useRemarkedPants } from "../../hooks/useRemarkedPants";
import { ShirtInputSchema } from "../../zod/shirt";
import "react-toastify/dist/ReactToastify.css";
import { PantsInputSchema } from "../../zod/pants";
import { useUniform } from "../../hooks/useUniform";
import { ToastContainer } from "react-toastify";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
const AdminEditDeletedInventory: React.FC = () => {
  const navigate = useNavigate();
  const [shirt, setShirt] = useState<ShirtInputSchema>({
    rfidNo: "",
    belongsTo: "",
    uniformType: "",
    gender: "",
    shoulderLen: "",
    sleeve: "",
    collarLen: "",
    row: "",
    rack: "",
  });
  const [pants, setPants] = useState<PantsInputSchema>({
    rfidNo: "",
    belongsTo: "",
    uniformType: "",
    gender: "",
    waist: "",
    length: "",
    row: "",
    rack: "",
  });
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const { rfidNo } = useParams();
  ``;

  const { uniform, findUniform } = useUniform();

  useEffect(() => {
    if (rfidNo) findUniform(rfidNo);
  }, []);

  useEffect(() => {
    if (uniform) {
      if (uniform.type === "shirt") setShirt(uniform.data as ShirtInputSchema);
      else setPants(uniform.data as PantsInputSchema);
    }
  }, [uniform]);
  
  useEffect(() => {
    if (uniform) {
      const oldRemark = uniform.data?.deleteReasonId;
      setSelectedRemark(oldRemark?.toString() || "null");
    }
  }, [uniform]);

  const handleRemarkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemark(event.target.value);
  };

  const { updateRemarkedShirt } = useRemarkedShirt();
  const { updateRemarkedPants } = useRemarkedPants();
  const { getReasons, reasons } = useReason();


  const handleSubmit = () => {
    if (uniform?.type === "shirt") {
      updateRemarkedShirt(rfidNo as string, {
        deleteReasonId: parseInt(selectedRemark),
      });
    }
    updateRemarkedPants(rfidNo as string, {
      deleteReasonId: parseInt(selectedRemark),
    });
    navigate ("/admin/delete-inventory", {
      state: {
        toastMessage: `"${uniform?.data.rfidNo}" reason to delete change into "${reasons.find((reason) => reason.id === parseInt(selectedRemark))?.name}"`,
      }
    });
  };

  useEffect(() => {
    getReasons();
  }, []);

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Inventory", url: "/admin/delete-inventory" },
    { label: "Edit Deleted Reason" },
  ];

  return (
    <AdminLayout
      headingText="Delete Inventory"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="flex justify-center items-center">
        <ContainerLayout className="w-[1000px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {uniform
                  ? `Uniform ID: ${uniform.data.rfidNo}`
                  : "Uniform ID: "}
              </h1>
              <p className="text-xl">
                {uniform
                  ? `Description: ${uniform.data.uniformType}, ${capitalizeFirstLetter(uniform.data.gender)} ${uniform.type}, ${uniform.data.belongsTo}`
                  : "Description: "}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={
                  uniform
                    ? uniform.type === "shirt"
                      ? shirtMaleNo1
                      : pantsMaleNo1
                    : ""
                }
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-9">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Reason for Deletion</h1>
              <div className="flex justify-between items-center">
                <div className="w-[500px]">
                  <SelectOptionPrimary
                    className="text-base py-[10px] px-[14px]"
                    placeholder="Select Remark"
                    name="remark"
                    value={selectedRemark?.toString() || ""}
                    onChange={handleRemarkChange}
                  >
                    {reasons.map((reason) => (
                      <option key={reason.id} value={reason.id}>
                        {reason.name}
                      </option>
                    ))}
                  </SelectOptionPrimary>
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary className="text-xl font-medium" onClick={handleSubmit}>
            Confirm
          </ButtonPrimary>
        </ContainerLayout>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminEditDeletedInventory;
