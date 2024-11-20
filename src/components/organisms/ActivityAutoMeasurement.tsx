import React from "react";
import { useStep } from "../../hooks/useStep";

const ActivityAutoMeasurement: React.FC = () => {
  const { step } = useStep();

  return (
    <>
      {step === "activity-auto-measurement" && (
        <div>
          <h1>Auto Measurement</h1>
        </div>
      )}
    </>
  );
};

export default ActivityAutoMeasurement;
