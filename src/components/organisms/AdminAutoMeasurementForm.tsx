import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import StepGender from "../../features/AdminRegistration/StepGender";
import AutoMeasurementForm from "../../features/AdminAutoMeasurement/AutoMeasurementForm";
import StepResult from "../../features/AdminManualMeasurement/StepResult";
import NotFound from "./NotFound";
import { disableBackOptionWhenAdmin } from "../../helpers/adminConditions";
import { useStaff } from "../../hooks/useStaff";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";

const AdminAutoMeasurementForm: React.FC = () => {
  const [manualMeasurementInput, setManualMeasurementInput] = useState<ManualMeasurementForm>({
    uniformType: "",
    shoulderLen: "",
    sleeve: "",
    collarLen: "",
    waist: "",
    length: ""
  });
  const [gender, setGender] = useState<string | null>(null);

  const { step, nextStep } = useStep();
  const { staff } = useStaff();
  const { getShirtsByFilter } = useShirt();
  const { getPantsByFilter } = usePants();

  const handleChange = (manualMeasurementInput: ManualMeasurementForm) => {
    setManualMeasurementInput(manualMeasurementInput);
  };

  const handleGenderConfirm = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!staff || !gender) return;

    const shirts = await getShirtsByFilter(
      manualMeasurementInput.uniformType,
      gender,
      manualMeasurementInput.collarLen,
      manualMeasurementInput.sleeve,
      manualMeasurementInput.shoulderLen
    );
    const pants = await getPantsByFilter(
      manualMeasurementInput.uniformType,
      gender,
      manualMeasurementInput.waist,
      manualMeasurementInput.length
    );

    if (shirts!.length > 0 || pants!.length > 0) {
      nextStep("activity-auto-measurement-result");
    } else {
      nextStep("activity-auto-measurement-notfound");
    }

    setManualMeasurementInput({
      uniformType: "",
      shoulderLen: "",
      sleeve: "",
      collarLen: "",
      waist: "",
      length: ""
    });
  };

  console.log(step); // Should log "activity-auto-measurement-gender" initially

  return (
    <>
      {step.includes("activity-auto-measurement") && (
        <form
          name="auto-measurement-form"
          id="auto-measurement-form"
          className="h-full w-full justify-between"
          onSubmit={handleSubmit}
        >
          {step === "activity-auto-measurement-gender" && (
            <StepGender nextStepDirection="activity-auto-measurement-uniform-type" onConfirm={handleGenderConfirm}/>
          )}
          {step === "activity-auto-measurement-uniform-type" && (
            <SelectUniformType manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} nextStepDirection="activity-auto-measurement-form" backOption={disableBackOptionWhenAdmin()} />
          )}
          {step === "activity-auto-measurement-form" && (
            <AutoMeasurementForm manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} onSubmit={() => handleSubmit} backOption={disableBackOptionWhenAdmin()} />
          )}
          {step === "activity-auto-measurement-result" && (
            <StepResult />
          )}
          {step === "activity-auto-measurement-notfound" && (
            <NotFound />
          )}
        </form>
      )}
    </>
  );
};

export default AdminAutoMeasurementForm;
