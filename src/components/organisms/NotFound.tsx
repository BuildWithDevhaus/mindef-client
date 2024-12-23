import React from 'react'
import ContainerLayout from '../templates/ContainerLayout'
import ButtonPrimary from '../atoms/ButtonPrimary'
import { useStep } from '../../hooks/useStep'
import { useStaff } from '../../hooks/useStaff'
import ButtonSecondary from '../atoms/ButtonSecondary'

const NotFound: React.FC = () => {
  const { resetStep, backToMain } = useStep();
  const { staffLogout } = useStaff();

  const handleConfirm = () => {
    staffLogout();
    resetStep();
  };

  return (
    <div className='flex justify-center items-center h-full max-w-3xl'>
      <ContainerLayout className='p-12'>
        <label className="text-6xl font-bold text-center">Sorry!</label>
        <p className='text-3xl text-center'>We do not have a match for you. Please kindly enquire with your Store Manager.</p>
        <div className='flex flex-col gap-5'>
          <ButtonSecondary variant="large" onClick={backToMain}>Back to Main</ButtonSecondary>
          <ButtonPrimary variant="large" onClick={handleConfirm}>End Session</ButtonPrimary>
        </div>
      </ContainerLayout>
    </div>
  )
}

export default NotFound
