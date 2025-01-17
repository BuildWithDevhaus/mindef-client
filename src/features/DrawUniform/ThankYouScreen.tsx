import React from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import { useStep } from '../../hooks/useStep'
import ButtonBack from '../../components/atoms/ButtonBack'
import { useStaff } from '../../hooks/useStaff'

const ThankYouScreen: React.FC<StepProps> = ({ backOption }) => {
  const { resetStep, nextStep } = useStep();
  const { staffLogout } = useStaff();

  const handleConfirm = () => {
    const isAdmin = window.location.href.includes("admin");
    
    if (isAdmin) {
      nextStep('activity-draw-uniform-scan-rfid');
    } else {
      staffLogout();
      resetStep();
    }
  };

  return (
    <>
      <div className='flex h-full justify-center items-center'>
        <ContainerLayout>
          <div className='flex flex-col gap-12 w-[796px] text-center'>
            <h1 className='font-bold text-[64px]'>Thank you!</h1>
            <p className='text-[32px]'>If you have any issues with the rented shirts or pants, please approach the store manager.</p>
            <ButtonPrimary onClick={handleConfirm} variant='large'>End Session</ButtonPrimary>
          </div>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  )
}

export default ThankYouScreen
