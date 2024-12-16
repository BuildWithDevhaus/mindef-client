import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import SelectOptionItem from "../../components/atoms/SelectOptionItem";
import ButtonBack from "../../components/atoms/ButtonBack";
import { UserRegistrationStepNextProps } from "../../types/staffSteps";

const StepDivision: React.FC<UserRegistrationStepNextProps> = ({
  userDetails,
  onConfirm,
  nextStepDestination,
  backOption
}) => {
  const [inputValue, setInputValue] = useState(userDetails);
  const { nextStep } = useStep();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue({ ...inputValue, divisionId: Number(e.target.value) });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    nextStep(nextStepDestination);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between h-full">
        <label className="text-6xl font-bold">Select your Unit/Wing</label>
        <SelectOptionPrimary placeholder="Select your Unit/Wing" value={inputValue.divisionId} onChange={handleChange} className="w-full">
          <SelectOptionItem value="Alpha" text="Alpha" />
          <SelectOptionItem value="Charlie" text="Charlie" />
          <SelectOptionItem value="Gamma" text="Gamma" />
        </SelectOptionPrimary>
        <ButtonPrimary onClick={() => handleConfirm()} variant="large">Confirm</ButtonPrimary>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default StepDivision;
