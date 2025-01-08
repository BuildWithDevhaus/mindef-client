import React, { useEffect, useRef, useState } from 'react'
import { useStep } from '../../hooks/useStep';
import { AdminNextStepDestionation } from '../../types/adminScanRfid';
import { useUniform } from '../../hooks/useUniform';
import { toastAlert } from '../../helpers/toastAlert';

const AdminScanRfid: React.FC<AdminNextStepDestionation> = ({ nextStepDestination }) => {
  const [rfidNo, setRfidNo] = useState<string>("");
  const [debouncedRfidNo, setDebouncedRfidNo] = useState<string>("");
  const { nextStep } = useStep();
  const { findUniform } = useUniform();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
        nextStep(nextStepDestination);
      } catch (error) {
        toastAlert("error", "The RFID code you entered is not registered in our system.");
      }
      setRfidNo("");
    })();
  }, [debouncedRfidNo]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-5">
      <h1 className="text-6xl font-bold">Scan RFID Code</h1>
      <h2 className="text-3xl text-center">
        Please scan the RDIF code in your shirt and pants using the barcode Scanner:
      </h2>
      <form name="rfid-form" id="rfid-form">
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
        />
      </form>
    </div>
  );
}

export default AdminScanRfid;
