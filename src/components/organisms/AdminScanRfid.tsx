import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';
import { AdminNextStepDestionation } from '../../types/adminScanRfid';
import { useUniform } from '../../hooks/useUniform';

const AdminScanRfid: React.FC<AdminNextStepDestionation> = ({ nextStepDestination }) => {
  const [rfidNo, setRfidNo] = useState("");
  const { nextStep } = useStep();
  const { findUniform } = useUniform();

  useEffect(() => {
    if (!rfidNo) return;

    (async () => {
      try {
        await findUniform(rfidNo);
        nextStep(nextStepDestination);
      } catch (error) {
        alert("The RFID code you entered is not registered in our system. Please contact the admin to register it before proceeding.");
      }
      setRfidNo("");
    })();
  }, [rfidNo]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
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
          className="border border-gray-300 bg-gray-200"
          value={rfidNo}
          onChange={handleScan}
        />
      </form>
    </div>
  )
}

export default AdminScanRfid
