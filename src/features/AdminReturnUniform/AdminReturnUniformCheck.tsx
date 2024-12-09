import React, { useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { deleteReasonData } from "../../dummy/DeleteReasonDummy";
import { useStep } from '../../hooks/useStep';
import shirtMaleNo1 from  "../../assets/images/Shirt (Male - No. 1).png"
import pantsMaleNo1 from  "../../assets/images/Pants (Male - No. 1).png"

const AdminReturnUniformCheck: React.FC<AdminScanRfidData> = ({ shirtData, pantsData }) => {
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { nextStep } = useStep();
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
                  ? `Shirt ID: ${shirtData.id}`
                  : `Pants ID: ${pantsData?.id}`}
              </h1>
              <p>
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
                      value={`${shirtData.shoulderLength} cm`}
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
                        value={`${shirtData.sleevesLength} cm`}
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
                      value={`${shirtData.collarLength} cm`}
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
                      value={`${pantsData?.waistLength} cm`}
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
                      value={`${pantsData?.pantsLength} cm`}
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
                    value={selectedRemark}
                    onChange={handleRemarkChange}
                    disabled={!isChecked}
                  >
                    {deleteReasonData.map(([id, status]) => (
                      <option
                        key={id.toString()}
                        value={(status as React.ReactElement).props.content}
                      >
                        {(status as React.ReactElement).props.content}
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
