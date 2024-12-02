import React from 'react'
import { useStep } from '../../hooks/useStep';
import ContainerLayout from '../../components/templates/ContainerLayout';
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ResultContainerLayout from '../../components/templates/ResultContainerLayout';
import ButtonPrimary from '../../components/atoms/ButtonPrimary';

const StepResult: React.FC = () => {
  const { step, resetStep, nextStep } = useStep();

  const handleConfirm = () => {
    const isAdmin = window.location.href.includes("admin");
    
    if (isAdmin) {
      if (step.includes('auto-measurement')) {
        nextStep('activity-auto-measurement-uniform-type');
      } else if (step.includes('manual-measurement')) {
        nextStep('activity-manual-measurement-uniform-type');
      }
    } else {
      resetStep();
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <ContainerLayout>
        <div className='flex flex-col items-center gap-[60px]'>
          <div className='w-[652px] text-center'>
            <h1 className='font-bold text-[36px]'>We found a match! You may proceed to try the uniform.</h1>
          </div>
          <ResultContainerLayout title="Shirt Location" image={shirtMaleNo1} row={2} rack="B2" no={25} />
          <ResultContainerLayout title="Pants Location" image={pantsMaleNo1} row={2} rack="B2" no={25} />
        </div>
        <ButtonPrimary variant="large" onClick={handleConfirm}>End Session</ButtonPrimary>
      </ContainerLayout>
    </div>
  )
}

export default StepResult
