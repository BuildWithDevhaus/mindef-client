import React from "react";
import ButtonCircle from "../../components/atoms/ButtonCircle";
import { useStep } from "../../hooks/useStep";

interface StepGenderProps {
  onConfirm: (gender: string) => void;
  nextStepDirection: string; 
}

const StepGender: React.FC<StepGenderProps> = ({ onConfirm, nextStepDirection }) => {
  const { nextStep } = useStep();
  
  const handleConfirm = (gender: string) => {
    onConfirm(gender);
    nextStep(nextStepDirection);
  };

  return (
    <div className="flex flex-col items-center h-full">
      <label className="text-6xl font-bold">Select your Gender</label>
      <div className="flex gap-48 h-full items-center">
        <ButtonCircle onClick={() => handleConfirm("male")}>Male</ButtonCircle>
        <ButtonCircle onClick={() => handleConfirm("female")}>Female</ButtonCircle>
      </div>
    </div>
  );
};

export default StepGender;
