import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { useStep } from '../../hooks/useStep';
import shirtMaleNo1 from  "../../assets/images/Shirt (Male - No. 1).png"
import pantsMaleNo1 from  "../../assets/images/Pants (Male - No. 1).png"
import { useReason } from "../../hooks/useReason";
import { AdminNextStepDestionation } from "../../types/adminScanRfid";
import { useUniform } from "../../hooks/useUniform";
import { ShirtSchema } from "../../zod/shirt";
import { PantsSchema } from "../../zod/pants";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";

const AdminReturnUniformCheck: React.FC<AdminNextStepDestionation> = ({ nextStepDestination }) => {
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
    drawUniform: []
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
    drawUniform: []
  });
  const { uniform } = useUniform();
  const { nextStep } = useStep();
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { getReasons, reasons } = useReason();
  const { updateShirt } = useShirt();
  const { updatePants } = usePants();

  useEffect(() => {
    if (!uniform) return;

    if (uniform.type === 'shirt') setSelectedShirt(uniform.data);
    if (uniform.type === 'pants') setSelectedPants(uniform.data);
  }, [uniform]);

  useEffect(() => {
    getReasons();
  }, []);

  const handleRemarkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemark(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => {
      if (prevState) {
        setSelectedRemark(""); 
      }
      return !prevState;
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedShirt.rfidNo) {
      if (selectedRemark) {
        updateShirt(selectedShirt.rfidNo, { status: 'remarked', deleteReasonId: parseInt(selectedRemark), disposalDate: new Date().toISOString() });
      } else {
        updateShirt(selectedShirt.rfidNo, { status: 'available' });
      }
    } else {
      if (selectedRemark) {
        updatePants(selectedPants.rfidNo, { status: 'remarked', deleteReasonId: parseInt(selectedRemark), disposalDate: new Date().toISOString() });
      } else {
        updatePants(selectedPants.rfidNo, { status: 'available' });
      }
    }

    nextStep(nextStepDestination);

    setIsChecked(false);
    setSelectedRemark("");
  }

  return (
    <div className="flex justify-center items-center">
      <form
        name="return-uniform-form"
        id="return-uniform-form"
        className="w-[800px]"
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
            {selectedShirt.rfidNo ? (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Shoulder</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Shoulder Width"
                      value={`${selectedShirt.shoulderLen}`}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Sleeve</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Length</p>
                      <InputFieldSecondary
                        className="max-w-[278px]"
                        placeholder="Sleeves Length"
                        value={`${selectedShirt.sleeve}`}
                      />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Collar</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Collar Length"
                      value={`${selectedShirt.collarLen}`}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Waist</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Waist Length"
                      value={`${selectedPants?.waist}`}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Pants Length</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Length</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Pants Length"
                      value={`${selectedPants?.length}`}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Remark</h1>
              <div className="flex justify-between items-center w-96">
                <div className="w-12 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="border-16 border-[#2F6D57] w-[18px] h-[18px]"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="w-[278px]">
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

export default AdminReturnUniformCheck;
