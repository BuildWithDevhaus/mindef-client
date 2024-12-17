import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';
import { AdminNewUniformFormNextProps } from '../../types/adminScanRfid';

const AdminUniformScanRfid: React.FC<AdminNewUniformFormNextProps> = ({ onConfirm, nextStepDestination }) => {
  const [rfidNo, setRfidNo] = useState("");
  const { nextStep } = useStep();

  useEffect(() => {
    if (!rfidNo) return;

    onConfirm({ rfidNo });
    nextStep(nextStepDestination);

    setRfidNo("");
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

export default AdminUniformScanRfid
