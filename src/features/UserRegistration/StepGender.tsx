import React from "react";
import ButtonCircle from "../../components/atoms/ButtonCircle";

const StepGender: React.FC<UserRegistrationStepProps & { onSubmit: () => void }> = ({
  userDetails,
  onConfirm,
  onSubmit,
}) => {
  const handleConfirm = (gender: string) => {
    onConfirm({ ...userDetails, gender });
    onSubmit();
  };

  return (
    <div className="flex flex-col items-center h-full">
      <label className="text-6xl font-bold">Select your Gender</label>
      <div className="flex gap-32 h-full items-center">
        <ButtonCircle onClick={() => handleConfirm("male")}>Male</ButtonCircle>
        <ButtonCircle onClick={() => handleConfirm("female")}>Female</ButtonCircle>
      </div>
    </div>
  );
};

export default StepGender;
