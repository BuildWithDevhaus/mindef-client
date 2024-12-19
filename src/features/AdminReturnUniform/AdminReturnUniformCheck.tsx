import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { useStep } from '../../hooks/useStep';
import shirtMaleNo1 from  "../../assets/images/Shirt (Male - No. 1).png"
import pantsMaleNo1 from  "../../assets/images/Pants (Male - No. 1).png"
import { AdminScanRfidData } from "../../types/adminScanRfid";
import { useReason } from "../../hooks/useReason";

const AdminReturnUniformCheck: React.FC<AdminScanRfidData> = ({ shirtData, pantsData }) => {
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { nextStep } = useStep();
  const handleRemarkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemark(event.target.value);
  };

    const { getReasons, reasons } = useReason();


    useEffect(() => {
        getReasons();
      }, []);
  

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => {
      if (prevState) {
        setSelectedRemark(""); 
      }
      return !prevState;
    });
  };

  const handleSubmit = () => {
    // TODO: Change to real logic

    nextStep("admin-return-uniform-confirmed");
    console.log({...shirtData, selectedRemark});
    console.log({...pantsData, selectedRemark});

    // TODO: Reset input values
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
                {shirtData
                  ? `Shirt ID: ${shirtData.rfidNo}`
                  : `Pants ID: ${pantsData?.rfidNo}`}
              </h1>
              <p className="text-xl">
                {shirtData
                  ? `Description: ${shirtData.uniformType}, ${shirtData.gender} Shirt, ${shirtData.belongsTo}`
                  : `Description: ${pantsData?.uniformType}, ${pantsData?.gender} Pants, ${pantsData?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={shirtData ? shirtMaleNo1 : pantsMaleNo1}
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-9">
            {shirtData ? (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Shoulder</h1>
                  <div className="flex justify-between items-center w-96">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Shoulder Width"
                      value={`${shirtData.shoulderLen}`}
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
                        value={`${shirtData.sleeve}`}
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
                      value={`${shirtData.collarLen}`}
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
                      value={`${pantsData?.waist}`}
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
                      value={`${pantsData?.length}`}
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
