import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import AutoMeasurementForm from "../../features/AutoMeasurement/AutoMeasurementForm";
import StepResult from "../../features/ManualMeasurement/StepResult";
import NotFound from "./NotFound";

const ActivityAutoMeasurement: React.FC = () => {
  const [manualMeasurementInput, setManualMeasurementInput] = useState<ManualMeasurementForm>({
    uniformType: "",
    shoulderLen: 16,
    sleeve: 16,
    collarLen: 16,
    waist: 16,
    length: 16
  });

  const { step, nextStep } = useStep();

  const handleChange = (manualMeasurementInput: ManualMeasurementForm) => {
    setManualMeasurementInput(manualMeasurementInput);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let resultFound = true;
    console.log(manualMeasurementInput);
    
    // TODO: Change this into real logic
    
    if (resultFound) {
      nextStep("activity-auto-measurement-result");
    } else {
      nextStep("activity-auto-measurement-notfound");
    }

    setManualMeasurementInput({
      uniformType: "",
      shoulderLen: 16,
      sleeve: 16,
      collarLen: 16,
      waist: 16,
      length: 16
    });
  };

  return (
    <>
      {step.includes("activity-auto-measurement") && (
        <form
          name="manual-measurement-form"
          id="manual-measurement-form"
          className="h-full w-full justify-between"
          onSubmit={handleSubmit}
        >
          {step === "activity-auto-measurement-uniform-type" && (
            <SelectUniformType manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} nextStepDirection="activity-auto-measurement-form" />
          )}
          {step === "activity-auto-measurement-form" && (
            <AutoMeasurementForm manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} onSubmit={() => handleSubmit} />
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
