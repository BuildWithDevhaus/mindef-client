import React from 'react'
import { useStep } from '../../hooks/useStep';
import AdminReturnUniformCheck from '../../features/AdminReturnUniform/AdminReturnUniformCheck';
import AdminReturnUniformConfirmed from '../../features/AdminReturnUniform/AdminReturnUniformConfirmed';
import AdminScanRfid from './AdminScanRfid';

const AdminReturnUniformForm: React.FC  = () => {
  const { step } = useStep();

  return (
    <>
      {step.includes("admin-return-uniform") && (
        <>
          {step === "admin-return-uniform-scan-rfid" && (
            <AdminScanRfid nextStepDestination="admin-return-uniform-form-check" />
          )}
          {step === "admin-return-uniform-form-check" && (
            <AdminReturnUniformCheck nextStepDestination="admin-return-uniform-confirmed" />
          )}
          {step === "admin-return-uniform-confirmed" && (
            <AdminReturnUniformConfirmed />
          )}
        </>
      )}
    </>
  );
}

export default AdminReturnUniformForm
