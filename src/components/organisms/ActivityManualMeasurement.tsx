import React from "react";
import { useStep } from "../../hooks/useStep";

const ActivityManualMeasurement: React.FC = () => {
  const { step } = useStep();

  return (
    <>
      {step === "activity-manual-measurement" && (
        <div>
          <h1>Manual Measurement</h1>
        </div>
      )}
    </>
  );
};

export default ActivityManualMeasurement;

