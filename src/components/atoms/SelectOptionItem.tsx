import React from "react";

const SelectOptionItem: React.FC<SelectOptionItemProps> = ({ value, text }) => {
  return <option value={value}>{text}</option>;
};

export default SelectOptionItem;
