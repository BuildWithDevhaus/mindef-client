import React from "react";
import ButtonCircle from "../../components/atoms/ButtonCircle";
import { useStep } from "../../hooks/useStep";
import ButtonBack from "../../components/atoms/ButtonBack";

const StepGender: React.FC<UserRegistrationStepProps & { onSubmit: () => void }> = ({
  userDetails,
  onConfirm,
  onSubmit,
}) => {
  const { setStep } = useStep();

  const handleConfirm = (gender: string) => {
    onConfirm({ ...userDetails, gender });
    onSubmit();
  };

  const handleBack = () => {
    setStep("user-registration-division");
  };

  return (
    <div className="flex flex-col items-center h-full">
      <label className="text-6xl font-bold">Select your Gender</label>
      <div className="flex gap-32 h-full items-center">
        <ButtonCircle onClick={() => handleConfirm("male")}>Male</ButtonCircle>
        <ButtonCircle onClick={() => handleConfirm("female")}>Female</ButtonCircle>
      </div>
      <ButtonBack onClick={handleBack} />
    </div>
  );
};

export default StepGender;
