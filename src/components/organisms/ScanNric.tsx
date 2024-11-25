import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";

interface Staff {
  name: string;
  division: string;
  gender: string;
}

const ScanNric: React.FC = () => {
  const [nricNo, setNricNo] = useState("");
  const { step, setStep } = useStep();

  useEffect(() => {
    if (!nricNo) return;

    const staff = checkStaff(nricNo); // TODO: Change this into real logic

    if (staff && step !== "select-activity") {
      setStep("select-activity");
      setNricNo("");
    } else if (!staff && step !== "user-registration-name") {
      setStep("user-registration-name");
      setNricNo("");
    }
  }, [nricNo]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNricNo(e.target.value);
  };

  // TODO: Change this into real logic
  const checkStaff = (nricNo: string) => {
    let staff: Staff | null = null;
    let isFound = false;

    if (isFound) {
      staff = {
        name: "John Doe",
        division: "Sales",
        gender: "Male",
      };
    }

    return isFound ? staff : null;
  };

  return (
    <>
      {step === "scan-nric" && (
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <h1 className="text-6xl font-bold">Scan your ID</h1>
          <h2 className="text-3xl">
            Please scan your ID using the barcode Scanner
          </h2>
          <form name="nric-form" id="nric-form">
            <input
              type="text"
              name="nricNo"
              id="nricNo"
              className="border border-gray-300 bg-gray-200"
              value={nricNo}
              onChange={handleScan}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ScanNric;
