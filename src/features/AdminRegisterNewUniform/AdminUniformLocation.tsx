import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import ButtonSecondary from "../../components/atoms/ButtonSecondary";
import { AdminNewUniformFormSubmitProps } from "../../types/adminScanRfid";

const AdminUniformLocation: React.FC<AdminNewUniformFormSubmitProps> = ({
  shirtData,
  pantsData,
  setShirtData,
  setPantsData,
  onSubmit,
}) => {
  const { backStep } = useStep();
  const [uniformLocation, setUniformLocation] = useState({
    row: "",
    rack: "",
  });

  useEffect(() => {
    if (shirtData.row || shirtData.rack) {
      setUniformLocation({
        ...uniformLocation,
        row: shirtData.row,
        rack: shirtData.rack,
      });
    } else if (pantsData.row || pantsData.rack) {
      setUniformLocation({
        ...uniformLocation,
        row: pantsData.row,
        rack: pantsData.rack,
      });
    }
  }, [shirtData, pantsData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (shirtData.belongsTo) {
      setShirtData({ ...shirtData, [e.target.name]: e.target.value });
    } else if (pantsData.belongsTo) {
      setPantsData({ ...pantsData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[800px]">
        <ContainerLayout>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {shirtData?.belongsTo
                  ? `Shirt ID: ${shirtData?.rfidNo}`
                  : `Pants ID: ${pantsData?.rfidNo}`}
              </h1>
              <p className="text-xl">
                {shirtData?.belongsTo
                  ? `Description: ${shirtData?.uniformType}, ${shirtData?.gender} Shirt, ${shirtData?.belongsTo}`
                  : `Description: ${pantsData?.uniformType}, ${pantsData?.gender} Pants, ${pantsData?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={shirtData?.belongsTo ? shirtMaleNo1 : pantsMaleNo1}
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-9">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Row</h1>
              <div className="flex justify-between items-center w-96">
                <InputFieldSecondary
                  className="max-w-[278px]"
                  placeholder="E1"
                  type="enabled"
                  name="row"
                  value={`${uniformLocation.row}`}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Rack</h1>
              <div className="flex justify-between items-center w-96">
                <InputFieldSecondary
                  className="max-w-[278px]"
                  placeholder="E"
                  type="enabled"
                  name="rack"
                  value={`${uniformLocation.rack}`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-9">
            <ButtonPrimary
              className="w-full text-xl font-medium"
              onClick={onSubmit}
            >
              Confirm
            </ButtonPrimary>
            <ButtonSecondary
              className="w-full text-xl font-medium"
              onClick={() => backStep()}
            >
              Back
            </ButtonSecondary>
          </div>
        </ContainerLayout>
      </div>
    </div>
  );
};

export default AdminUniformLocation;
