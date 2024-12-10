import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';

const AdminScanRfid: React.FC<AdminScanRfidFunction> = ({ setShirtData, setPantsData, nextStepDestination }) => {
  const [rfidNo, setRfidNo] = useState("");
  const { nextStep } = useStep();

  useEffect(() => {
    if (!rfidNo) return;

    // TODO: Check if user scan the same item
    checkInventory("Shirt");

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
        id: 9983843733,
        belongsTo: "Infantry",
        gender: "Female",
        uniformType: "No. 1",
        shoulderLength: 16,
        sleevesLength: 34,
        collarLength: 18,
        shirtLocation: {
          Row: 8,
          Rack: "T3",
          No: 12
        }
      })
    } else {
      setPantsData({
        id: 8983843734,
        belongsTo: "Army",
        gender: "Male",
        uniformType: "Colour Party",
        pantsLength: 16,
        waistLength: 34,
        pantsLocation: {
          Row: 1,
          Rack: "B3",
          No: 27
        }
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
