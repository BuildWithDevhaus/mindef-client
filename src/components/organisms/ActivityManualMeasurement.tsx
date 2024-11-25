import React, { useRef, useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import StepShirt from "../../features/ManualMeasurement/StepShirt";
import StepPants from "../../features/ManualMeasurement/StepPants";
import StepResult from "../../features/ManualMeasurement/StepResult";
import NotFound from "./NotFound";

const ActivityManualMeasurement: React.FC = () => {
  const [manualMeasurementInput, setManualMeasurementInput] = useState<ManualMeasurementForm>({
    uniformType: "",
    shoulderLen: 0,
    sleeve: 0,
    collarLen: 0,
    waist: 0,
    length: 0
  });

  const { step, setStep } = useStep();

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (manualMeasurementInput: ManualMeasurementForm) => {
    setManualMeasurementInput(manualMeasurementInput);
    console.log(step);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Change this into real logic
    setStep("select-activity");
  };

  return (
    <>
      {step.includes("activity-manual-measurement") && (
        <form
          ref={formRef}
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
            <StepPants manualMeasurementInput={manualMeasurementInput} onConfirm={handleChange} />
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

