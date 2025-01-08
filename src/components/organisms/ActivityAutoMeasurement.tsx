import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import AutoMeasurementForm from "../../features/AutoMeasurement/AutoMeasurementForm";
import StepResult from "../../features/ManualMeasurement/StepResult";
import NotFound from "./NotFound";
import { disableBackOptionWhenAdmin } from "../../helpers/adminConditions";
import { useStaff } from "../../hooks/useStaff";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";

const ActivityAutoMeasurement: React.FC = () => {
  const [manualMeasurementInput, setManualMeasurementInput] = useState<ManualMeasurementForm>({
    uniformType: "",
    shoulderLen: "",
    sleeve: "",
    collarLen: "",
    waist: "",
    length: ""
  });

  const { step, nextStep } = useStep();
    const { staff } = useStaff();
    const { getShirtsByFilter } = useShirt();
    const { getPantsByFilter } = usePants();

  const handleChange = (manualMeasurementInput: ManualMeasurementForm) => {
    setManualMeasurementInput(manualMeasurementInput);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!staff) return;

    const shirts = await getShirtsByFilter(manualMeasurementInput.uniformType, staff.gender, manualMeasurementInput.collarLen, manualMeasurementInput.sleeve, manualMeasurementInput.shoulderLen);
    const pants = await getPantsByFilter(manualMeasurementInput.uniformType, staff.gender, manualMeasurementInput.waist, manualMeasurementInput.length);

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

  return (
    <>
      {step.includes("activity-auto-measurement") && (
        <form
          name="auto-measurement-form"
          id="auto-measurement-form"
          className="h-full w-full justify-between"
          onSubmit={handleSubmit}
        >
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

export default ActivityAutoMeasurement;
