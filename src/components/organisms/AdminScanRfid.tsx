import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';

const AdminScanRfid: React.FC<AdminScanRfidFunction> = ({ setShirtData, setPantsData }) => {
  const [rfidNo, setRfidNo] = useState("");
  const { nextStep } = useStep();

  useEffect(() => {
    if (!rfidNo) return;

    // TODO: Check if user scan the same item
    checkInventory("Pants");

    nextStep("admin-return-uniform-form-check");

    setRfidNo("");
  }, [rfidNo]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
  };

  // TODO: Change this into real logic
  const checkInventory = (rfidNo: string) => {
    if (rfidNo === "shirt") {
      setShirtData({
        id: 9983843733,
        collarLen: 10,
        sleeve: 10,
        shoulderLen: 10
      })
    } else {
      setPantsData({
        id: 8983843734,
        waist: 10,
        length: 10
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
