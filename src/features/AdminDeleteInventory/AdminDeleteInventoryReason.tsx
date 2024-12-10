import React, { useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { deleteReasonData } from "../../dummy/DeleteReasonDummy";
import { useStep } from '../../hooks/useStep';
import shirtMaleNo1 from  "../../assets/images/Shirt (Male - No. 1).png"
import pantsMaleNo1 from  "../../assets/images/Pants (Male - No. 1).png"

const AdminDeleteInventoryReason: React.FC<AdminScanRfidData> = ({ shirtData, pantsData }) => {
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const { nextStep } = useStep();
  const handleRemarkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemark(event.target.value);
  };


  const handleSubmit = () => {
    // TODO: Change to real logic

    nextStep("admin-delete-uniform-form-result");
    console.log({...shirtData, selectedRemark});
    console.log({...pantsData, selectedRemark});

    // TODO: Reset input values
  }

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
                {shirtData
                  ? `Shirt ID: ${shirtData.id}`
                  : `Pants ID: ${pantsData?.id}`}
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
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Reason for Deletion</h1>
              <div className="flex justify-between items-center">
                <div className="w-[500px]">
                  <SelectOptionPrimary
                    className="text-base py-[10px] px-[14px]"
                    placeholder="Select Remark"
                    value={selectedRemark}
                    onChange={handleRemarkChange}
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

export default AdminDeleteInventoryReason;
