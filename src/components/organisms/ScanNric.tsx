import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useStaff } from "../../hooks/useStaff";

const ScanNric: React.FC = () => {
  const [nricNo, setNricNo] = useState("");
  const { step, nextStep } = useStep();
  const { staff, isCheckingStaff, staffLogin } = useStaff();

  useEffect(() => {
    if (!nricNo) return;

    staffLogin(nricNo);

    if (!isCheckingStaff) {
      if (staff && step !== "existing-user-confirmation") {
        nextStep("existing-user-confirmation");
      } else if (!staff && step !== "user-registration-name") {
        nextStep("user-registration-name");
      }
      setNricNo("");
    }
  }, [nricNo, isCheckingStaff]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNricNo(e.target.value);
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
