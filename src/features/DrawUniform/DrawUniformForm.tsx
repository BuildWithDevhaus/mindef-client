import React from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ButtonPrimary from '../../components/atoms/ButtonPrimary';
import ButtonSecondary from '../../components/atoms/ButtonSecondary';
import { useStep } from '../../hooks/useStep';

const DrawUniformForm: React.FC = () => {
  const { nextStep } = useStep();

  const handleConfirm = () => {
    // TODO: Change this into real logic

    nextStep('activity-draw-uniform-thank-you');
  }

  const handleReselect = () => {
    nextStep('activity-draw-uniform-reselect');
  }

  return (
    <div className='flex h-full justify-center items-center'>
      <ContainerLayout>
        <div className='flex flex-col gap-12'>
          <div className='flex gap-24'>
            <div className='flex flex-col gap-12'>
              <div className='flex justify-between items-center'>
                <label className='font-bold text-[32px]'>Shirt</label>
                <img
                  src={shirtMaleNo1}
                  alt="Shirt"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className='border border-black' />
              <div className='flex flex-col gap-3'>
                <div>
                  <p className='font-bold text-[32px]'>Shirt ID:</p>
                  <p className='font-bold text-[32px]'>9983847389</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl'>Description : No. 1 Male Shirt, Infantry</p>
                  <p className='text-2xl'>Shoulder Length : <span className='font-bold'>20 cm</span></p>
                  <p className='text-2xl'>Collar : <span className='font-bold'>16 cm</span></p>
                  <p className='text-2xl'>Sleeve Length : <span className='font-bold'>34 cm</span></p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-12'>
              <div className='flex justify-between items-center'>
                <label className='font-bold text-[32px]'>Pants</label>
                <img
                  src={pantsMaleNo1}
                  alt="Pants"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className='border border-black' />
              <div className='flex flex-col gap-3'>
                <div>
                  <p className='font-bold text-[32px]'>Pants ID:</p>
                  <p className='font-bold text-[32px]'>9983847389</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl'>Description : No. 1 Male Pants, Infantry</p>
                  <p className='text-2xl'>Waist : <span className='font-bold'>29 cm</span></p>
                  <p className='text-2xl'>Trouser Length : <span className='font-bold'>34 cm</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <ButtonPrimary variant='large' onClick={handleConfirm}>Confirm</ButtonPrimary>
            <ButtonSecondary variant='large' onClick={handleReselect}>Reselect your uniform</ButtonSecondary>
          </div>
        </div>
      </ContainerLayout>
    </div>
  )
}

export default DrawUniformForm
