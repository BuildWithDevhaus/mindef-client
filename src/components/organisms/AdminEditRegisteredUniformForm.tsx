import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep';
import AdminUniformDetails from '../../features/AdminRegisterNewUniform/AdminUniformDetails';
import AdminUniformDimension from '../../features/AdminRegisterNewUniform/AdminUniformDimension';
import { ShirtInputSchema } from '../../zod/shirt';
import { PantsInputSchema } from '../../zod/pants';
import { useShirt } from '../../hooks/useShirt';
import { usePants } from '../../hooks/usePants';
import AdminUniformLocation from '../../features/AdminRegisterNewUniform/AdminUniformLocation';
import { useNavigate, useParams } from 'react-router-dom';
import { useUniform } from '../../hooks/useUniform';

const AdminEditRegisteredUniformForm: React.FC  = () => {
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
  const { rfidNo } = useParams();

  const { step } = useStep();
  const { updateShirt } = useShirt();
  const { updatePants } = usePants();
  const { uniform, findUniform } = useUniform();
  const navigate = useNavigate();

  useEffect(() => {
    if (rfidNo) findUniform(rfidNo);
  }, []);

  useEffect(() => {
    if (uniform) {
      if (uniform.type === 'shirt') setShirt(uniform.data as ShirtInputSchema);
      else setPants(uniform.data as PantsInputSchema);
    }
  }, [uniform]);

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
      updateShirt(shirt.rfidNo, shirt);
    } else {
      updatePants(pants.rfidNo, pants);
    }
    
    navigate("/admin/register-inventory");
    handleResetForm();
  }

  const handleResetForm = () => {
    setShirt({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", shoulderLen: 0, sleeve: 0, collarLen: 0, row: "", rack: "" });
    setPants({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", waist: 0, length: 0, row: "", rack: "" });
  }

  return (
    <>
      {step.includes("admin-edit-registered-uniform") && (
        <form
          name="new-uniform-form"
          id="new-uniform-form"
          className='h-full'
          onSubmit={handleSubmit}
        >
          {step === "admin-edit-registered-uniform-form-details" && (
            <AdminUniformDetails nextStepDestination="admin-edit-registered-uniform-form-dimension" onConfirm={handleConfirm} shirtData={shirt} pantsData={pants} />
          )}
          {step === "admin-edit-registered-uniform-form-dimension" && (
            <AdminUniformDimension nextStepDestination="admin-edit-registered-uniform-form-location" shirtData={shirt} pantsData={pants} onConfirm={handleConfirm} />
          )}
          {step === "admin-edit-registered-uniform-form-location" && (
            <AdminUniformLocation shirtData={shirt} pantsData={pants} onConfirm={handleConfirm} onSubmit={() => handleSubmit} />
          )}
        </form>
      )}
    </>
  );
}

export default AdminEditRegisteredUniformForm
