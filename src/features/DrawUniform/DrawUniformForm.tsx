import React, { useEffect, useRef, useState } from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ButtonPrimary from '../../components/atoms/ButtonPrimary';
import ButtonSecondary from '../../components/atoms/ButtonSecondary';
import { useStep } from '../../hooks/useStep';
import ButtonBack from '../../components/atoms/ButtonBack';
import { useUniform } from '../../hooks/useUniform';
import { ShirtSchema } from '../../zod/shirt';
import { PantsSchema } from '../../zod/pants';
import { capitalizeFirstLetter } from '../../helpers/wordStructure';
import { toastAlert } from '../../helpers/toastAlert';

const DrawUniformForm: React.FC<StepProps> = ({ backOption }) => {
  const [rfidNo, setRfidNo] = useState<string>("");
  const [debouncedRfidNo, setDebouncedRfidNo] = useState<string>("");
  const [selectedShirt, setSelectedShirt] = useState<ShirtSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    collarLen: "",
    sleeve: "",
    shoulderLen: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: []
  });
  const [selectedPants, setSelectedPants] = useState<PantsSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    waist: "",
    length: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: []
  });
  const { uniform, findUniform, createDrawUniform } = useUniform();
  const { nextStep } = useStep();

  const inputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!uniform) return;

    if (uniform.type === 'shirt') setSelectedShirt(uniform.data);
    if (uniform.type === 'pants') setSelectedPants(uniform.data);
  }, [uniform]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRfidNo(rfidNo);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [rfidNo]);

  useEffect(() => {
    if (!debouncedRfidNo) return;

    (async () => {
      try {
        await findUniform(debouncedRfidNo);
      } catch (error) {
        toastAlert("error", "The RFID code you entered is not registered in our system.");
      }
      setRfidNo("");
    })();
  }, [debouncedRfidNo]);

  const handleConfirm = async () => {
    if (selectedShirt?.rfidNo && selectedPants?.rfidNo) {
      await createDrawUniform({ shirtId: selectedShirt.id, pantsId: selectedPants.id });
      nextStep('activity-draw-uniform-thank-you');
    } else {
      alert('Please scan both shirt and pants.');
    }
  }

  const handleReselect = () => {
    nextStep('activity-draw-uniform-reselect');
  }

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const preventFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
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
                <div className='flex flex-col gap-3 max-w-lg'>
                  {selectedShirt?.rfidNo ? (
                    <>
                      <div>
                        <p className='font-bold text-[32px]'>Shirt ID:</p>
                        <p className='font-bold text-[32px]'>{selectedShirt.rfidNo}</p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-2xl'>Description : {selectedShirt.uniformType} {capitalizeFirstLetter(selectedShirt.gender)} Shirt, {selectedShirt.belongsTo}</p>
                        <p className='text-2xl'>Shoulder Length : <span className='font-bold'>{selectedShirt.shoulderLen} cm</span></p>
                        <p className='text-2xl'>Collar : <span className='font-bold'>{selectedShirt.collarLen} cm</span></p>
                        <p className='text-2xl'>Sleeve Length : <span className='font-bold'>{selectedShirt.sleeve} cm</span></p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className='font-bold text-[32px] mb-3'>Scan RFID Code</p>
                      <p className='text-2xl'>Please scan the RDIF code in your shirt using the barcode scanner.</p>
                    </div>
                  )}
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
                <div className='flex flex-col gap-3 max-w-lg'>
                  {selectedPants?.rfidNo ? (
                    <>
                      <div>
                        <p className='font-bold text-[32px]'>Pants ID:</p>
                        <p className='font-bold text-[32px]'>{selectedPants.rfidNo}</p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-2xl'>Description : {selectedPants.uniformType} {capitalizeFirstLetter(selectedPants.gender)} Pants, {selectedPants.belongsTo}</p>
                        <p className='text-2xl'>Waist : <span className='font-bold'>{selectedPants.waist} cm</span></p>
                        <p className='text-2xl'>Trouser Length : <span className='font-bold'>{selectedPants.length} cm</span></p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className='font-bold text-[32px] mb-3'>Scan RFID Code</p>
                      <p className='text-2xl'>Please scan the RDIF code in your pants using the barcode scanner.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <ButtonPrimary variant='large' onClick={handleConfirm}>Confirm</ButtonPrimary>
              {(!window.location.href.includes('admin')) && (
                <ButtonSecondary variant='large' onClick={handleReselect}>Reselect your uniform</ButtonSecondary>
              )}
            </div>
          </div>
        </ContainerLayout>
      </div>

      <form name="rfid-form" id="rfid-form" onSubmit={preventFormSubmission}>
        <input
          type="text"
          name="rfidNo"
          id="rfidNo"
          className="border border-gray-300 bg-gray-200 opacity-0 cursor-default absolute"
          value={rfidNo}
          onChange={handleScan}
          ref={inputRef}
          onBlur={handleBlur}
          autoComplete='off'
          onKeyDown={handleKeyDown}
        />
      </form>

      {backOption && <ButtonBack />}
    </>
  )
}

export default DrawUniformForm
