import React from "react";
import IconCloseBox from "../atoms/IconCloseBox";
import IconPencil from "../atoms/IconPencil";
import clsx from "clsx";


const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, onClick, className }) => {
  const renderIcon = () => {
    switch (icon) {
      case "close":
        return <IconCloseBox />;
      case "pencil":
        return <IconPencil />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex justify-center items-center w-8 h-8 rounded-md hover hover:scale-110",
        className
      )}
    >
      {renderIcon()}
    </button>
  );
};

export default ButtonIcon;
