import clsx from "clsx";
import React from "react";
import IconBack from "./IconBack";

const ButtonBack: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <button
      className={clsx(
        `flex gap-3 items-center font-semibold py-2 px-4 text-2xl fixed top-3 left-3
        }`,
        className
      )}
      onClick={onClick}
    >
      <IconBack />
      Back
    </button>
  );
};

export default ButtonBack;
