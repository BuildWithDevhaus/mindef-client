import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import SelectOptionItem from "../../components/atoms/SelectOptionItem";
import ButtonBack from "../../components/atoms/ButtonBack";

const StepDivision: React.FC<UserRegistrationStepProps> = ({
  userDetails,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState(userDetails);
  const { setStep } = useStep();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue({ ...inputValue, division: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    setStep("user-registration-gender");
  };

  const handleBack = () => {
    setStep("user-registration-name");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <label className="text-6xl font-bold">Select your Unit/Wing</label>
      <SelectOptionPrimary placeholder="Select your Unit/Wing" value={inputValue.division} onChange={handleChange} className="w-full">
        <SelectOptionItem value="Alpha" text="Alpha" />
        <SelectOptionItem value="Charlie" text="Charlie" />
        <SelectOptionItem value="Gamma" text="Gamma" />
      </SelectOptionPrimary>
      <ButtonPrimary onClick={() => handleConfirm()}>Confirm</ButtonPrimary>
      <ButtonBack onClick={handleBack} />
    </div>
  );
};

export default StepDivision;
