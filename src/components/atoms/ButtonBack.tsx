import clsx from "clsx";
import React from "react";
import IconBack from "./IconBack";
import { useStep } from "../../hooks/useStep";

const ButtonBack: React.FC<BackButtonProps> = ({ className }) => {
  const { backStep } = useStep();

  return (
    <button
      className={clsx(
        `flex gap-3 items-center font-semibold py-2 px-4 text-2xl fixed top-5 left-5
        }`,
        className
      )}
      onClick={() => backStep()}
    >
      <IconBack />
      Back
    </button>
  );
};

export default ButtonBack;
