import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import InputFieldPrimary from "../../components/atoms/InputFieldPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";

const StepName: React.FC<UserRegistrationStepProps> = ({
  userDetails,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState(userDetails);
  const { setStep } = useStep();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, name: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    setStep("user-registration-division");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <label className="text-6xl font-bold">Enter Your Name</label>
      <InputFieldPrimary
        placeholder="John Doe"
        value={inputValue.name}
        onChange={handleChange}
      />
      <ButtonPrimary onClick={() => handleConfirm()}>Confirm</ButtonPrimary>
    </div>
  );
};

export default StepName;
