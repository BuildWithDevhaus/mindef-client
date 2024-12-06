import React from "react";
import { useStep } from "../../hooks/useStep";
import ScanRfidUser from "../../features/DrawUniform/ScanRfidUser";
import DrawUniformForm from "../../features/DrawUniform/DrawUniformForm";
import ThankYouScreen from "../../features/DrawUniform/ThankYouScreen";
import SelectActivity from "./SelectActivity";
import { disableBackOptionWhenAdmin } from "../../helpers/adminConditions";

const ActivityDrawUniform: React.FC = () => {
  const { step } = useStep();

  return (
    <>
      {step.includes("activity-draw-uniform") && (
        <>
          {step === "activity-draw-uniform-scan-rfid" && (
            <ScanRfidUser backOption={disableBackOptionWhenAdmin()} />
          )}
          {step === "activity-draw-uniform-form" && (
            <DrawUniformForm backOption={disableBackOptionWhenAdmin()} />
          )}
          {step === "activity-draw-uniform-reselect" && (
            <SelectActivity drawUniform={false} backOption={disableBackOptionWhenAdmin()} />
          )}
          {step === "activity-draw-uniform-thank-you" && (
            <ThankYouScreen />
          )}
        </>
      )}
    </>
  );
};

export default ActivityDrawUniform;

