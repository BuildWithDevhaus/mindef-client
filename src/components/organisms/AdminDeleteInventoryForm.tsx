import React from 'react'
import { useStep } from '../../hooks/useStep';
import AdminScanRfid from './AdminScanRfid';
import AdminDeleteInventoryReason from '../../features/AdminDeleteInventory/AdminDeleteInventoryReason';
import AdminDeleteInventoryResult from '../../features/AdminDeleteInventory/AdminDeleteInventoryResult';

const AdminDeleteInventoryForm: React.FC  = () => {
  const { step } = useStep();

  return (
    <>
      {step.includes("admin-delete-uniform") && (
        <>
          {step === "admin-delete-uniform-scan-rfid" && (
            <AdminScanRfid nextStepDestination="admin-delete-uniform-form-reason" />
          )}
          {step === "admin-delete-uniform-form-reason" && (
            <AdminDeleteInventoryReason nextStepDestination='admin-delete-uniform-form-result'/>
          )}
          {step === "admin-delete-uniform-form-result" && (
            <AdminDeleteInventoryResult />
          )}
        </>
      )}
    </>
  );
}

export default AdminDeleteInventoryForm
