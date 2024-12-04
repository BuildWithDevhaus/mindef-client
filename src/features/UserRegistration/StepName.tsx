import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import InputFieldPrimary from "../../components/atoms/InputFieldPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";

const StepName: React.FC<UserRegistrationStepProps> = ({
  userDetails,
  onConfirm,
  nextStepDestination
}) => {
  const [inputValue, setInputValue] = useState(userDetails);
  const { nextStep } = useStep();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, name: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    nextStep(nextStepDestination);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <label className="text-6xl font-bold">Enter Your Name</label>
      <InputFieldPrimary
        className="text-center"
        placeholder="John Doe"
        value={inputValue.name}
        onChange={handleChange}
      />
      <ButtonPrimary onClick={() => handleConfirm()} variant="large">Confirm</ButtonPrimary>
    </div>
  );
};

export default StepName;
