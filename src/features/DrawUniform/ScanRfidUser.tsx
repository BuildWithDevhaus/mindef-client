import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep'
import ButtonBack from '../../components/atoms/ButtonBack';

const ScanRfidUser: React.FC<StepProps> = ({ backOption }) => {
  const [rfidNo, setRfidNo] = useState("");
  const [shirt, setShirt] = useState<Shirt | null>(null);
  const [pants, setPants] = useState<Pants | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const { step, nextStep } = useStep();

  useEffect(() => {
    if (!rfidNo) return;

    // TODO: Change this into real logic
    const randomInventory = Math.random() > 0.5 ? "shirt" : "pants";

    // TODO: Check if user scan the same item
    checkInventory(randomInventory);
    setScanCount(scanCount + 1);
    setRfidNo("");
  }, [rfidNo]);

  useEffect(() => {
    if (scanCount === 2) {
      if (shirt && pants && step !== "activity-draw-uniform-form") {
        // TODO: Actual saving to database

        nextStep("activity-draw-uniform-form");
      } else {
        alert("Shirt or pants not found, please try again.");
      }
        
      setRfidNo("");
      setShirt(null);
      setPants(null);
      setScanCount(0);
    }
  }, [shirt, pants]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRfidNo(e.target.value);
  };

  // TODO: Change this into real logic
  const checkInventory = (rfidNo: string) => {
    if (rfidNo === "shirt") {
      setShirt({
        id: 1,
        collarLen: 10,
        sleeve: 10,
        shoulderLen: 10
      })
    } else {
      setPants({
        id: 1,
        waist: 10,
        length: 10
      })
    }
  };

  return (
    <>
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

      {backOption && <ButtonBack />}
    </>
  )
}

export default ScanRfidUser
