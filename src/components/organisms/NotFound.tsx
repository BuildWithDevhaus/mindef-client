import React from 'react'
import ContainerLayout from '../templates/ContainerLayout'
import ButtonPrimary from '../atoms/ButtonPrimary'
import { useStep } from '../../hooks/useStep'

const NotFound: React.FC = () => {
  const { resetStep } = useStep();

  const handleConfirm = () => {
    resetStep();
  };

  return (
    <div className='flex justify-center items-center h-full max-w-3xl'>
      <ContainerLayout className='p-12'>
        <label className="text-6xl font-bold text-center">Sorry!</label>
        <p className='text-3xl text-center'>We do not have a match for you. Please kindly enquire with your Store Manager.</p>
        <ButtonPrimary variant="large" onClick={handleConfirm}>End Session</ButtonPrimary>
      </ContainerLayout>
    </div>
  )
}

export default NotFound
