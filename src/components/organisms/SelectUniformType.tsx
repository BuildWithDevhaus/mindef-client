import React from 'react'
import ButtonCircle from '../atoms/ButtonCircle'
import { useStep } from '../../hooks/useStep';
import ButtonBack from '../atoms/ButtonBack';

const SelectUniformType: React.FC<ManualMeasurementStepProps> = ({ manualMeasurementInput, onConfirm }) => {
  const { nextStep, backStep } = useStep();

  const handleConfirm = (uniformType: string) => {
    onConfirm({ ...manualMeasurementInput, uniformType });
    nextStep("activity-manual-measurement-shirt");
  };

  const handleBack = () => {
    backStep();
  };

  return (
    <div className="flex flex-col items-center h-full">
      <label className="text-6xl font-bold">Select your Uniform type:</label>
      <div className='flex gap-48 h-full items-center'>
        {/* TODO: Hide Colour Party when user is a female */}
        <ButtonCircle onClick={() => handleConfirm("No.1")}>No.1</ButtonCircle>
        <ButtonCircle onClick={() => handleConfirm("Colour Party")}>Colour Party</ButtonCircle>
      </div>
      <ButtonBack onClick={handleBack} />
    </div>
  )
}

export default SelectUniformType
