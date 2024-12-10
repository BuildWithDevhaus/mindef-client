import React, { useState } from 'react'
import { useStep } from '../../hooks/useStep';
import AdminScanRfid from './AdminScanRfid';
import AdminUniformDetails from '../../features/AdminRegisterNewUniform/AdminUniformDetails';
import AdminUniformDimension from '../../features/AdminRegisterNewUniform/AdminUniformDimension';
import AdminUniformResult from '../../features/AdminRegisterNewUniform/AdminUniformResult';

const AdminRegisterNewUniformForm: React.FC  = () => {
  const [shirt, setShirt] = useState<Shirt | undefined>(undefined);
  const [pants, setPants] = useState<Pants | undefined>(undefined);

  const { step } = useStep();

  return (
    <>
      {step.includes("admin-register-new-uniform") && (
        <>
          {step === "admin-register-new-uniform-scan-rfid" && (
            <AdminScanRfid nextStepDestination="admin-register-new-uniform-form-uniform-details" setShirtData={setShirt} setPantsData={setPants} />
          )}
          {step === "admin-register-new-uniform-form-uniform-details" && (
            <AdminUniformDetails shirtData={shirt} pantsData={pants} />
          )}
          {step === "admin-register-new-uniform-form-uniform-dimension" && (
            <AdminUniformDimension shirtData={shirt} pantsData={pants} />
          )}
          {step === "admin-register-new-uniform-form-result" && (
            <AdminUniformResult shirtData={shirt} pantsData={pants} />
          )}
        </>
      )}
    </>
  );
}

export default AdminRegisterNewUniformForm
