import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import { AdminNextStepDestionation } from "../../types/adminScanRfid";
import { ShirtSchema } from "../../zod/shirt";
import { PantsSchema } from "../../zod/pants";
import { usePants } from "../../hooks/usePants";
import { useShirt } from "../../hooks/useShirt";
import { useReason } from "../../hooks/useReason";
import { useUniform } from "../../hooks/useUniform";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";

const AdminDeleteInventoryReason: React.FC<AdminNextStepDestionation> = ({
  nextStepDestination,
}) => {
  const [selectedShirt, setSelectedShirt] = useState<ShirtSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    collarLen: "",
    sleeve: "",
    shoulderLen: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: [],
  });
  const [selectedPants, setSelectedPants] = useState<PantsSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    waist: "",
    length: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: [],
  });
  const { uniform } = useUniform();
  const { nextStep } = useStep();
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const { getReasons, reasons } = useReason();
  const { updateShirt } = useShirt();
  const { updatePants } = usePants();

  useEffect(() => {
    if (!uniform) return;

    if (uniform.type === "shirt") setSelectedShirt(uniform.data);
    if (uniform.type === "pants") setSelectedPants(uniform.data);
  }, [uniform]);

  useEffect(() => {
    getReasons();
  }, []);

  const handleRemarkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemark(event.target.value);
  };

  const handleSubmit = () => {
    if (uniform?.type === "shirt") {
      updateShirt(selectedShirt.rfidNo, {
        status: "remarked",
        deleteReasonId: parseInt(selectedRemark),
        disposalDate: new Date().toISOString(),
      });
    }
    updatePants(selectedPants.rfidNo, {
      status: "remarked",
      deleteReasonId: parseInt(selectedRemark),
      disposalDate: new Date().toISOString(),
    });
    nextStep(nextStepDestination);
  };

  return (
    <div className="flex justify-center items-center">
      <form
        name="return-uniform-form"
        id="return-uniform-form"
        className="w-[1000px]"
        onSubmit={handleSubmit}
      >
        <ContainerLayout>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {selectedShirt.rfidNo
                  ? `Shirt ID: ${selectedShirt.rfidNo}`
                  : `Pants ID: ${selectedPants?.rfidNo}`}
              </h1>
              <p className="text-xl">
                {selectedShirt.rfidNo
                  ? `Description: ${selectedShirt.uniformType}, ${capitalizeFirstLetter(selectedShirt.gender)} Shirt, ${selectedShirt.belongsTo}`
                  : `Description: ${selectedPants?.uniformType}, ${capitalizeFirstLetter(selectedPants?.gender)} Pants, ${selectedPants?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={selectedShirt.rfidNo ? shirtMaleNo1 : pantsMaleNo1}
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
                    value={selectedRemark}
                    onChange={handleRemarkChange}
                  >
                    {reasons.map ((reason) => (
                      <option key={reason.id} value={reason.id}>
                        {reason.name}
                      </option>
                    ))}
                  </SelectOptionPrimary>
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary
            className="text-xl font-medium"
            onClick={() => handleSubmit}
          >
            Confirm
          </ButtonPrimary>
        </ContainerLayout>
      </form>
    </div>
  );
};

export default AdminDeleteInventoryReason;
