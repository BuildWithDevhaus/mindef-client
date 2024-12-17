import React, { useState } from 'react'
import { useStep } from '../../hooks/useStep';
import AdminUniformDetails from '../../features/AdminRegisterNewUniform/AdminUniformDetails';
import AdminUniformDimension from '../../features/AdminRegisterNewUniform/AdminUniformDimension';
import { ShirtInputSchema } from '../../zod/shirt';
import { PantsInputSchema } from '../../zod/pants';
import AdminUniformScanRfid from '../../features/AdminRegisterNewUniform/AdminUniformScanRfid';
import { useShirt } from '../../hooks/useShirt';
import { usePants } from '../../hooks/usePants';
import AdminUniformLocation from '../../features/AdminRegisterNewUniform/AdminUniformLocation';
import AdminUniformResult from '../../features/AdminRegisterNewUniform/AdminUniformResult';

const AdminRegisterNewUniformForm: React.FC  = () => {
  const [shirt, setShirt] = useState<ShirtInputSchema>({
    rfidNo: "",
    belongsTo: "",
    uniformType: "",
    gender: "",
    shoulderLen: 0,
    sleeve: 0,
    collarLen: 0,
    row: "",
    rack: "",
  });
  const [pants, setPants] = useState<PantsInputSchema>({
    rfidNo: "",
    belongsTo: "",
    uniformType: "",
    gender: "",
    waist: 0,
    length: 0,
    row: "",
    rack: "",
  });

  const { step, nextStep } = useStep();
  const { createShirt } = useShirt();
  const { createPants } = usePants();

  const handleConfirm = (data: any) => {
    if ((data.collarLen && data.sleeve && data.shoulderLen) || data.topBottom === 'shirt') {
      if (data.topBottom === 'shirt') delete data.topBottom;
      setShirt({ ...shirt, ...data });
    } else if ((data.waist && data.length) || data.topBottom === 'pants') {
      if (data.topBottom === 'pants') delete data.topBottom;
      setPants({ ...pants, ...data });
    } else {
      setShirt({ ...shirt, ...data });
      setPants({ ...pants, ...data });
    }
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (shirt.collarLen && shirt.sleeve && shirt.shoulderLen) {
      createShirt(shirt);
    } else {
      createPants(pants);
    }
    
    nextStep("admin-register-new-uniform-form-result");
  }

  const handleResetForm = () => {
    setShirt({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", shoulderLen: 0, sleeve: 0, collarLen: 0, row: "", rack: "" });
    setPants({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", waist: 0, length: 0, row: "", rack: "" });
  }

  return (
    <>
      {(step.includes("admin-register-new-uniform") && !step.includes("admin-register-new-uniform-form-result")) && (
        <form
          name="new-uniform-form"
          id="new-uniform-form"
          className='h-full'
          onSubmit={handleSubmit}
        >
          {step === "admin-register-new-uniform-scan-rfid" && (
            <AdminUniformScanRfid nextStepDestination="admin-register-new-uniform-form-uniform-details" onConfirm={handleConfirm} />
          )}
          {step === "admin-register-new-uniform-form-uniform-details" && (
            <AdminUniformDetails nextStepDestination="admin-register-new-uniform-form-uniform-dimension" onConfirm={handleConfirm} />
          )}
          {step === "admin-register-new-uniform-form-uniform-dimension" && (
            <AdminUniformDimension nextStepDestination="admin-register-new-uniform-form-uniform-location" shirtData={shirt} pantsData={pants} onConfirm={handleConfirm} />
          )}
          {step === "admin-register-new-uniform-form-uniform-location" && (
            <AdminUniformLocation shirtData={shirt} pantsData={pants} onConfirm={handleConfirm} onSubmit={() => handleSubmit} />
          )}
        </form>
      )}
      {step === "admin-register-new-uniform-form-result" && (
        <AdminUniformResult shirtData={shirt} pantsData={pants} onResetForm={handleResetForm} />
      )}
    </>
  );
}

export default AdminRegisterNewUniformForm
