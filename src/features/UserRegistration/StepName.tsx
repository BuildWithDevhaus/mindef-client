import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import InputFieldPrimary from "../../components/atoms/InputFieldPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import ButtonBack from "../../components/atoms/ButtonBack";
import { UserRegistrationStepNextProps } from "../../types/staffSteps";
import { useStaff } from "../../hooks/useStaff";

const StepName: React.FC<UserRegistrationStepNextProps> = ({
  userDetails,
  onConfirm,
  nextStepDestination,
  backOption
}) => {
  const [inputValue, setInputValue] = useState(userDetails);
  const { staff } = useStaff();
  const { nextStep } = useStep();

  useEffect(() => {
    if (staff) {
      setInputValue({ ...inputValue, name: staff.name });
    }
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, name: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    nextStep(nextStepDestination);
  };

  return (
    <>
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

      {backOption && <ButtonBack />}
    </>
  );
};

export default StepName;
