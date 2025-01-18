import React, { useEffect, useRef, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useStaff } from "../../hooks/useStaff";

const ScanNric: React.FC = () => {
  const [nricNo, setNricNo] = useState("");
  const { step, nextStep } = useStep();
  const [debouncedNricNo, setDebouncedNricno] = useState<string>("");

  const { staff, isCheckingStaff, staffLogin } = useStaff();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNricno(nricNo);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [nricNo]);

  useEffect(() => {
    if (!debouncedNricNo) return;
    staffLogin(debouncedNricNo);
  }, [debouncedNricNo]);

  useEffect(() => {
    if (!isCheckingStaff) {
      if (staff) {
        nextStep("existing-user-confirmation");
      } else {
        nextStep("user-registration-name");
      }
      setNricNo("");
    }
  }, [isCheckingStaff]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNricNo(e.target.value);
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
      {step === "scan-nric" && (
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <h1 className="text-6xl font-bold">Scan your ID</h1>
          <h2 className="text-3xl">
            Please scan your ID using the barcode Scanner.
          </h2>
          <form name="nric-form" id="nric-form" onSubmit={preventFormSubmission}>
            <input
              type="text"
              name="nricNo"
              id="nricNo"
              className="border border-gray-300 bg-gray-200 opacity-0 cursor-default absolute"
              value={nricNo}
              onChange={handleScan}
              ref={inputRef}
              onBlur={handleBlur}
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ScanNric;
