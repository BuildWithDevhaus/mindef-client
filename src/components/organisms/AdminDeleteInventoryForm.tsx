import React, { useState } from 'react'
import { useStep } from '../../hooks/useStep';
import AdminScanRfid from './AdminScanRfid';
import AdminDeleteInventoryReason from '../../features/AdminDeleteInventory/AdminDeleteInventoryReason';
import AdminDeleteInventoryResult from '../../features/AdminDeleteInventory/AdminDeleteInventoryResult';

const AdminDeleteInventoryForm: React.FC  = () => {
  const [shirt, setShirt] = useState<Shirt | undefined>(undefined);
  const [pants, setPants] = useState<Pants | undefined>(undefined);

  const { step } = useStep();

  return (
    <>
      {step.includes("admin-delete-uniform") && (
        <>
          {step === "admin-delete-uniform-scan-rfid" && (
            <AdminScanRfid nextStepDestination="admin-delete-uniform-form-reason" setShirtData={setShirt} setPantsData={setPants} />
          )}
          {step === "admin-delete-uniform-form-reason" && (
            <AdminDeleteInventoryReason shirtData={shirt} pantsData={pants} />
          )}
          {step === "admin-delete-uniform-form-result" && (
            <AdminDeleteInventoryResult shirtData={shirt} pantsData={pants} />
          )}
        </>
      )}
    </>
  );
}

export default AdminDeleteInventoryForm
