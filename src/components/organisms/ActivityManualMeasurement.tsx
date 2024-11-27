import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import StepShirt from "../../features/ManualMeasurement/StepShirt";
import StepPants from "../../features/ManualMeasurement/StepPants";
import StepResult from "../../features/ManualMeasurement/StepResult";
import NotFound from "./NotFound";

const ActivityManualMeasurement: React.FC = () => {
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
      nextStep("activity-manual-measurement-result");
    } else {
      nextStep("activity-manual-measurement-notfound");
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
      {step.includes("activity-manual-measurement") && (
        <form
          name="manual-measurement-form"
          id="manual-measurement-form"
          className="h-full w-full justify-between"
          onSubmit={handleSubmit}
        >
          {step === "activity-manual-measurement-uniform-type" && (
            <SelectUniformType manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} />
          )}
          {step === "activity-manual-measurement-shirt" && (
            <StepShirt manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} />
          )}
          {step === "activity-manual-measurement-pants" && (
            <StepPants manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} onSubmit={() => handleSubmit}/>
          )}
          {step === "activity-manual-measurement-result" && (
            <StepResult />
          )}
          {step === "activity-manual-measurement-notfound" && (
            <NotFound />
          )}
        </form>
      )}
    </>
  );
};

export default ActivityManualMeasurement;

