import React, { useState } from 'react'
import { useStep } from '../../hooks/useStep';
import AdminReturnUniformCheck from '../../features/AdminReturnUniform/AdminReturnUniformCheck';
import AdminReturnUniformConfirmed from '../../features/AdminReturnUniform/AdminReturnUniformConfirmed';
import AdminScanRfid from './AdminScanRfid';

const AdminReturnUniformForm: React.FC  = () => {
  const [shirt, setShirt] = useState<Shirt | undefined>(undefined);
  const [pants, setPants] = useState<Pants | undefined>(undefined);

  const { step } = useStep();

  return (
    <>
      {step.includes("admin-return-uniform") && (
        <>
          {step === "admin-return-uniform-scan-rfid" && (
            <AdminScanRfid setShirtData={setShirt} setPantsData={setPants} />
          )}
          {step === "admin-return-uniform-form-check" && (
            <AdminReturnUniformCheck shirtData={shirt} pantsData={pants} />
          )}
          {step === "admin-return-uniform-confirmed" && (
            <AdminReturnUniformConfirmed shirtData={shirt} pantsData={pants} />
          )}
        </>
      )}
    </>
  );
}

export default AdminReturnUniformForm
