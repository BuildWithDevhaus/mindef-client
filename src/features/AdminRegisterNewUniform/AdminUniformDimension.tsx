import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import ButtonSecondary from "../../components/atoms/ButtonSecondary";
import { AdminNewUniformFormNextProps } from "../../types/adminScanRfid";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { toastAlert } from "../../helpers/toastAlert";
import IconMeasure from "../../components/atoms/IconMeasure";
import { userSerialPort } from "../../hooks/userSerialPort";

const AdminUniformDimension: React.FC<AdminNewUniformFormNextProps> = ({
  shirtData,
  pantsData,
  setShirtData,
  setPantsData,
  nextStepDestination,
}) => {
  const { nextStep, backStep } = useStep();
  const [shirtDimensions, setShirtDimensions] = useState(shirtData);
  const [pantsDimensions, setPantsDimensions] = useState(pantsData);
  const { getSerialData } = userSerialPort();

  useEffect(() => {
    if (shirtData.collarLen || shirtData.sleeve || shirtData.shoulderLen) {
      setShirtDimensions({
        ...shirtDimensions,
        collarLen: shirtData.collarLen,
        sleeve: shirtData.sleeve,
        shoulderLen: shirtData.shoulderLen,
      });
    } else if (pantsData.waist || pantsData.length) {
      setPantsDimensions({
        ...pantsDimensions,
        waist: pantsData.waist,
        length: pantsData.length,
      });
    }
  }, [shirtData, pantsData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (shirtDimensions.belongsTo) {
      setShirtDimensions({
        ...shirtDimensions,
        [name]: value,
      });
    } else if (pantsDimensions.belongsTo) {
      setPantsDimensions({
        ...pantsDimensions,
        [name]: value,
      });
    }
  };

  const handleConfirm = () => {
    if (shirtDimensions.belongsTo && shirtDimensions.collarLen && shirtDimensions.sleeve && shirtDimensions.shoulderLen) {
      setShirtData(shirtDimensions);
      nextStep(nextStepDestination);
    } else if (pantsDimensions.belongsTo && pantsDimensions.waist && pantsDimensions.length) {
      setPantsData(pantsDimensions);
      nextStep(nextStepDestination);
    } else {
      toastAlert("error", "Please fill in all the details.");
    }
  };
  

  const handleSerial = async (inputName: string) => {
    try {
      const serialData = await getSerialData();
      
      handleChange({
        target: { name: inputName, value: serialData },
      } as React.ChangeEvent<HTMLInputElement>);
    } catch (err) {
      console.error(err);
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
                  ? `Description: ${shirtData?.uniformType}, ${capitalizeFirstLetter(shirtData?.gender)} Shirt, ${shirtData?.belongsTo}`
                  : `Description: ${pantsData?.uniformType}, ${capitalizeFirstLetter(pantsData?.gender)} Pants, ${pantsData?.belongsTo}`}
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
            {shirtData?.belongsTo ? (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Shoulder</h1>
                  <div className="flex justify-between items-center w-[26rem]">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Shoulder Width"
                      type="enabled"
                      name="shoulderLen"
                      value={`${shirtDimensions.shoulderLen}`}
                      onChange={handleChange}
                    />
                    <div onClick={() => handleSerial("shoulderLen")} className="cursor-pointer">
                      <IconMeasure />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Sleeve</h1>
                  <div className="flex justify-between items-center w-[26rem]">
                    <p className="font-medium">Length</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Sleeves Length"
                      type="enabled"
                      name="sleeve"
                      value={`${shirtDimensions.sleeve}`}
                      onChange={handleChange}
                    />
                    <div onClick={() => handleSerial("sleeve")} className="cursor-pointer">
                      <IconMeasure />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Collar</h1>
                  <div className="flex justify-between items-center w-[26rem]">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Collar Length"
                      type="enabled"
                      name="collarLen"
                      value={`${shirtDimensions.collarLen}`}
                      onChange={handleChange}
                    />
                    <div onClick={() => handleSerial("collarLen")} className="cursor-pointer">
                      <IconMeasure />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Waist</h1>
                  <div className="flex justify-between items-center w-[26rem]">
                    <p className="font-medium">Width</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Waist Length"
                      type="enabled"
                      name="waist"
                      value={`${pantsDimensions.waist}`}
                      onChange={handleChange}
                    />
                    <div onClick={() => handleSerial("waist")} className="cursor-pointer">
                      <IconMeasure />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Pants Length</h1>
                  <div className="flex justify-between items-center w-[26rem]">
                    <p className="font-medium">Length</p>
                    <InputFieldSecondary
                      className="max-w-[278px]"
                      placeholder="Pants Length"
                      type="enabled"
                      name="length"
                      value={`${pantsDimensions.length}`}
                      onChange={handleChange}
                    />
                    <div onClick={() => handleSerial("length")} className="cursor-pointer">
                      <IconMeasure />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="w-full flex gap-9">
            <ButtonPrimary
              className="w-full text-xl font-medium"
              onClick={handleConfirm}
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

export default AdminUniformDimension;
