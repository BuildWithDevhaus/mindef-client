import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";
import SelectUniformType from "./SelectUniformType";
import StepShirt from "../../features/AdminManualMeasurement/StepShirt";
import StepPants from "../../features/AdminManualMeasurement/StepPants";
import StepResult from "../../features/AdminManualMeasurement/StepResult";
import NotFound from "./NotFound";
import StepGender from "../../features/AdminRegistration/StepGender";
import { disableBackOptionWhenAdmin } from "../../helpers/adminConditions";
import { useStaff } from "../../hooks/useStaff";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";

const AdminManualMeasurementForm: React.FC = () => {
  const [manualMeasurementInput, setManualMeasurementInput] = useState<ManualMeasurementForm>({
    uniformType: "",
    shoulderLen: "16",
    sleeve: "16",
    collarLen: "16",
    waist: "16",
    length: "16",
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
      nextStep("activity-manual-measurement-result");
    } else {
      nextStep("activity-manual-measurement-notfound");
    }

    setManualMeasurementInput({
      uniformType: "",
      shoulderLen: "16",
      sleeve: "16",
      collarLen: "16",
      waist: "16",
      length: "16",
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
          {step === "activity-manual-measurement-gender" && (
            <StepGender
              onConfirm={handleGenderConfirm}
              nextStepDirection="activity-manual-measurement-uniform-type"
            />
          )}
          {step === "activity-manual-measurement-uniform-type" && (
            <SelectUniformType
              manualMeasurementInput={manualMeasurementInput}
              onConfirm={handleChange}
              nextStepDirection="activity-manual-measurement-shirt"
              backOption={disableBackOptionWhenAdmin()}
            />
          )}
          {step === "activity-manual-measurement-shirt" && (
            <StepShirt
              manualMeasurementInput={manualMeasurementInput}
              onConfirm={handleChange}
              nextStepDirection="activity-manual-measurement-pants"
              backOption={disableBackOptionWhenAdmin()}
            />
          )}
          {step === "activity-manual-measurement-pants" && (
            <StepPants
              manualMeasurementInput={manualMeasurementInput}
              onConfirm={handleChange}
              onSubmit={() => handleSubmit}
              backOption={disableBackOptionWhenAdmin()}
            />
          )}
          {step === "activity-manual-measurement-result" && <StepResult />}
          {step === "activity-manual-measurement-notfound" && <NotFound />}
        </form>
      )}
    </>
  );
};

export default AdminManualMeasurementForm;
