import React from 'react'
import { useStep } from '../../hooks/useStep';
import ButtonCircle from '../atoms/ButtonCircle';

const SelectActivity: React.FC = () => {
  const { step, setStep } = useStep();

  return (
    <>
      {step === "select-activity" && (
        <div className='flex flex-col items-center justify-center gap-32 h-full'>
          <div className='flex gap-72'>
            <ButtonCircle onClick={() => setStep("activity-auto-measurement")}>Auto Measurement</ButtonCircle>
            <ButtonCircle onClick={() => setStep("activity-manual-measurement-uniform-type")}>Manual Measurement Entry</ButtonCircle>
          </div>
          <ButtonCircle onClick={() => setStep("activity-draw-uniform")}>Draw Uniform</ButtonCircle>
        </div>
      )}
    </>
  )
}

export default SelectActivity
