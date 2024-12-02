import React from 'react'
import { useStep } from '../../hooks/useStep';
import ButtonCircle from '../atoms/ButtonCircle';
import ButtonBack from '../atoms/ButtonBack';

const SelectActivity: React.FC = () => {
  const { step, nextStep, backStep } = useStep();

  const handleBack = () => {
    backStep();
  };

  return (
    <>
      {(step === "select-activity" || step === "activity-draw-uniform-reselect" || step === "existing-user-reselect" || step === "existing-user-select-activity") && (
        <div className='flex flex-col items-center justify-center gap-32 h-full'>
          <div className='flex gap-72'>
            <ButtonCircle onClick={() => nextStep("activity-auto-measurement-uniform-type")}>Auto Measurement</ButtonCircle>
            <ButtonCircle onClick={() => nextStep("activity-manual-measurement-uniform-type")}>Manual Measurement Entry</ButtonCircle>
          </div>
          {/* TODO: Change step into global variable to handle back button */}
          {(step !== "activity-draw-uniform-reselect" && step !== "existing-user-reselect") ? (
            <ButtonCircle onClick={() => nextStep("activity-draw-uniform-scan-rfid")}>Draw Uniform</ButtonCircle>
          ) : (
            <ButtonBack onClick={handleBack} />
          )}
        </div>
      )}
    </>
  )
}

export default SelectActivity
