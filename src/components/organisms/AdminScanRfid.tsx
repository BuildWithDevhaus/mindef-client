import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';
import { AdminScanRfidFunction } from '../../types/adminScanRfid';

const AdminScanRfid: React.FC<AdminScanRfidFunction> = ({ setShirtData, setPantsData, nextStepDestination }) => {
  const [rfidNo, setRfidNo] = useState("");
  const { nextStep } = useStep();

  useEffect(() => {
    if (!rfidNo) return;

    // TODO: Check if user scan the same item
    checkInventory("Pants");

    if (nextStepDestination) {
      nextStep(nextStepDestination);
    }

    setRfidNo("");
  }, [rfidNo]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
  };

  // TODO: Change this into real logic
  const checkInventory = (rfidNo: string) => {
    if (rfidNo === "Shirt") {
      setShirtData({
        rfidNo: 'RFID123123',
        belongsTo: "Infantry",
        gender: "Female",
        uniformType: "No. 1",
        shoulderLen: 16,
        sleeve: 34,
        collarLen: 18,
        row: 'B',
        rack: "B3",
      })
    } else {
      setPantsData({
        rfidNo: 'RFID123123',
        belongsTo: "Infantry",
        gender: "Female",
        uniformType: "No. 1",
        waist: 16,
        length: 34,
        row: 'B',
        rack: "B3",
      })
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
          className="border border-gray-300 bg-gray-200"
          value={rfidNo}
          onChange={handleScan}
        />
      </form>
    </div>
  )
}

export default AdminScanRfid
