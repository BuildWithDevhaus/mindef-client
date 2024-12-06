import React from 'react'
import { useStep } from '../../hooks/useStep';
import ButtonCircle from '../atoms/ButtonCircle';
import ButtonBack from '../atoms/ButtonBack';

const SelectActivity: React.FC<StepActivityProps> = ({ backOption, drawUniform }) => {
  const { nextStep } = useStep();

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-32 h-full'>
        <div className='flex gap-72'>
          <ButtonCircle onClick={() => nextStep("activity-auto-measurement-uniform-type")}>Auto Measurement</ButtonCircle>
          <ButtonCircle onClick={() => nextStep("activity-manual-measurement-uniform-type")}>Manual Measurement Entry</ButtonCircle>
        </div>
        {drawUniform && (
          <ButtonCircle onClick={() => nextStep("activity-draw-uniform-scan-rfid")}>Draw Uniform</ButtonCircle>
        )}
      </div>
      
      {backOption && <ButtonBack />}
    </>
  )
}

export default SelectActivity
