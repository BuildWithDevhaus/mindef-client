import React from 'react'
import { useStep } from '../../hooks/useStep';
import ContainerLayout from '../../components/templates/ContainerLayout';
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ResultContainerLayout from '../../components/templates/ResultContainerLayout';
import ButtonPrimary from '../../components/atoms/ButtonPrimary';
import ButtonBack from '../../components/atoms/ButtonBack';
import { useShirt } from '../../hooks/useShirt';
import { usePants } from '../../hooks/usePants';
import { useStaff } from '../../hooks/useStaff';

const StepResult: React.FC<StepProps> = ({ backOption }) => {
  const { step, resetStep, nextStep } = useStep();
  const { filteredShirts } = useShirt();
  const { filteredPants } = usePants();
  const { staffLogout } = useStaff();

  const handleConfirm = () => {
    const isAdmin = window.location.href.includes("admin");
    
    if (isAdmin) {
      if (step.includes('auto-measurement')) {
        nextStep('activity-auto-measurement-uniform-type');
      } else if (step.includes('manual-measurement')) {
        nextStep('activity-manual-measurement-uniform-type');
      }
    } else {
      staffLogout();
      resetStep();
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-full'>
        <ContainerLayout>
          <div className='flex flex-col items-center gap-[60px]'>
            <div className='w-[652px] text-center'>
              <h1 className='font-bold text-[36px]'>We found a match! You may proceed to try the uniform.</h1>
            </div>
            <ResultContainerLayout title="Shirt Location" image={shirtMaleNo1} row={filteredShirts[0]?.row} rack={filteredShirts[0]?.rack} />
            <ResultContainerLayout title="Pants Location" image={pantsMaleNo1} row={filteredPants[0]?.row} rack={filteredPants[0]?.rack} />
          </div>
          <ButtonPrimary variant="large" onClick={handleConfirm}>End Session</ButtonPrimary>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  )
}

export default StepResult
