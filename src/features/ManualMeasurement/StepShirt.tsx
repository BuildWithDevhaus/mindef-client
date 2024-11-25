import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Measure Shirt (Male - No. 1).png";
import ContainerLayout from "../../components/templates/ContainerLayout";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import SelectOptionItem from "../../components/atoms/SelectOptionItem";
import InputContainerLayout from "../../components/templates/InputContainerLayout";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";

const StepShirt: React.FC<ManualMeasurementStepProps> = ({
  manualMeasurementInput,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);
  const { setStep } = useStep();

  const handleChange = (key: string, value: string | number) => {
    setInputValue({ ...inputValue, [key]: value });
  };

  const handleConfirm = () => {
    onConfirm({ ...manualMeasurementInput, ...inputValue });
    setStep("activity-manual-measurement-pants");
  };

  return (
    <div className="flex items-center h-full justify-between">
      {/* TODO: Change Image based on option */}
      <img src={shirtMaleNo1} alt="Shirt Image" className="w-1/2" />
      <ContainerLayout>
        <InputContainerLayout title="1. Shoulder Length" label="Width">
          <SelectOptionPrimary
            placeholder="Select your Shoulder Length"
            value={inputValue.shoulderLen}
            onChange={(e) => handleChange("shoulderLen", e.target.value)}
            className="text-lg bg-white bg-[length:32px]"
          >
            <SelectOptionItem value="16" text="16" />
            <SelectOptionItem value="17" text="17" />
            <SelectOptionItem value="18" text="18" />
            <SelectOptionItem value="19" text="19" />
            <SelectOptionItem value="20" text="20" />
          </SelectOptionPrimary>
        </InputContainerLayout>
        <InputContainerLayout title="2. Sleeve" label="Length">
          <SelectOptionPrimary
            placeholder="Select your Sleeve"
            value={inputValue.sleeve}
            onChange={(e) => handleChange("sleeve", e.target.value)}
            className="text-lg bg-white bg-[length:32px]"
          >
            <SelectOptionItem value="16" text="16" />
            <SelectOptionItem value="17" text="17" />
            <SelectOptionItem value="18" text="18" />
            <SelectOptionItem value="19" text="19" />
            <SelectOptionItem value="20" text="20" />
          </SelectOptionPrimary>
        </InputContainerLayout>
        <InputContainerLayout title="3. Collar Length" label="Width">
          <SelectOptionPrimary
            placeholder="Select your Collar Length"
            value={inputValue.collarLen}
            onChange={(e) => handleChange("collarLen", e.target.value)}
            className="text-lg bg-white bg-[length:32px]"
          >
            <SelectOptionItem value="16" text="16" />
            <SelectOptionItem value="17" text="17" />
            <SelectOptionItem value="18" text="18" />
            <SelectOptionItem value="19" text="19" />
            <SelectOptionItem value="20" text="20" />
          </SelectOptionPrimary>
        </InputContainerLayout>
        <ButtonPrimary className="py-5 text-xl" onClick={handleConfirm}>Submit</ButtonPrimary>
      </ContainerLayout>
    </div>
  );
};

export default StepShirt;
