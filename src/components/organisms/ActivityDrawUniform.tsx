import React from "react";
import { useStep } from "../../hooks/useStep";

const ActivityDrawUniform: React.FC = () => {
  const { step } = useStep();

  return (
    <>
      {step === "activity-draw-uniform" && (
        <div>
          <h1>Draw Uniform</h1>
        </div>
      )}
    </>
  );
};

export default ActivityDrawUniform;

