import React from 'react'
import ButtonCircle from '../atoms/ButtonCircle'
import { useStep } from '../../hooks/useStep';

const SelectUniformType: React.FC<ManualMeasurementStepProps> = ({ manualMeasurementInput, onConfirm }) => {
  const { setStep } = useStep();

  const handleConfirm = (uniformType: string) => {
    onConfirm({ ...manualMeasurementInput, uniformType });
    setStep("activity-manual-measurement-shirt");
  };

  return (
    <div className="flex flex-col items-center h-full">
      <label className="text-6xl font-bold">Select your Uniform type:</label>
      <div className='flex gap-32 h-full items-center'>
        {/* TODO: Hide Colour Party when user is a female */}
        <ButtonCircle onClick={() => handleConfirm("No.1")}>No.1</ButtonCircle>
        <ButtonCircle onClick={() => handleConfirm("Colour Party")}>Colour Party</ButtonCircle>
      </div>
    </div>
  )
}

export default SelectUniformType
