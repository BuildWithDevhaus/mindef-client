import React from "react";
import ButtonCircle from "../../components/atoms/ButtonCircle";
import ButtonBack from "../../components/atoms/ButtonBack";
import { UserRegistrationStepSubmitProps } from "../../types/staffSteps";

const StepGender: React.FC<UserRegistrationStepSubmitProps> = ({
  userDetails,
  onConfirm,
  onSubmit,
  backOption
}) => {
  const handleConfirm = (gender: string) => {
    onConfirm({ ...userDetails, gender });
    onSubmit();
  };

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <label className="text-6xl font-bold">Select your Gender</label>
        <div className="flex gap-48 h-full items-center">
          <ButtonCircle onClick={() => handleConfirm("male")}>Male</ButtonCircle>
          <ButtonCircle onClick={() => handleConfirm("female")}>Female</ButtonCircle>
        </div>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default StepGender;
