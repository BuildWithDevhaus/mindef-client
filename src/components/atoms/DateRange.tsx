import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DateRangeProps {
  value: DateValueType;
  onChange: (value: DateValueType) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ value, onChange }) => {
  return (
    <Datepicker
      primaryColor={"teal"}
      useRange={true}
      value={value}
      onChange={onChange}
    />
  );
};

export default DateRange;
