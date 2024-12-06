import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import InputContainerLayout from "../../components/templates/InputContainerLayout";
import ButtonBack from "../../components/atoms/ButtonBack";

const AutoMeasurementForm: React.FC<ManualMeasurementFormStepSubmitProps> = ({
  manualMeasurementInput,
  onConfirm,
  onSubmit,
  backOption,
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);

  useEffect(() => {
    // TODO: Load the data from the file
    const dummyData = {
      collarLen: 22,
      sleeve: 21,
      shoulderLen: 20,
      waist: 19,
      length: 18,
    };

    setInputValue({ ...manualMeasurementInput, ...dummyData });
  }, []);

  const handleConfirm = () => {
    onConfirm({ ...manualMeasurementInput, ...inputValue });
    onSubmit();
  };

  return (
    <>
      <div className="flex h-full justify-center items-center">
        <ContainerLayout>
          <div className="flex flex-col gap-12">
            <div className="flex gap-24">
              <div className="flex flex-col gap-12">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[32px]">Shirt</label>
                  <img
                    src={shirtMaleNo1}
                    alt="Shirt"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="border border-black" />
                <InputContainerLayout title="Shoulder Length" label="Width">
                  <InputFieldSecondary
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.shoulderLen}
                  />
                </InputContainerLayout>
                <InputContainerLayout title="Sleeve" label="Length">
                  <InputFieldSecondary
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.sleeve}
                  />
                </InputContainerLayout>
                <InputContainerLayout title="Collar Length" label="Width">
                  <InputFieldSecondary
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.collarLen}
                  />
                </InputContainerLayout>
              </div>
              <div className="flex flex-col gap-12">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[32px]">Pants</label>
                  <img
                    src={pantsMaleNo1}
                    alt="Pants"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="border border-black" />
                <InputContainerLayout title="Waist" label="Width">
                  <InputFieldSecondary
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.waist}
                  />
                </InputContainerLayout>
                <InputContainerLayout title="Pants Length" label="Length">
                  <InputFieldSecondary
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.length}
                  />
                </InputContainerLayout>
              </div>
            </div>
            <ButtonPrimary variant="large" onClick={handleConfirm}>
              Confirm
            </ButtonPrimary>
          </div>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default AutoMeasurementForm;
