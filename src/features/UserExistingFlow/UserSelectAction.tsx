import React from "react";
import ButtonCircle from "../../components/atoms/ButtonCircle";
import ButtonBack from "../../components/atoms/ButtonBack";
import { useStep } from "../../hooks/useStep";

const UserSelectAction: React.FC<StepProps> = ({ backOption }) => {
  const { nextStep } = useStep();

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <label className="text-6xl font-bold">Select your Action:</label>
        <div className="flex gap-48 h-full items-center">
          <ButtonCircle onClick={() => nextStep("existing-user-check-dimensions")}>
            Check Existing Dimensions
          </ButtonCircle>
          <ButtonCircle
            onClick={() => nextStep("activity-draw-uniform-scan-rfid")}
          >
            Draw Uniform
          </ButtonCircle>
        </div>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default UserSelectAction;
