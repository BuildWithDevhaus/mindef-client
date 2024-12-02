import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DateRangeProps {
  value: DateValueType;
  onChange: (value: DateValueType) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ value, onChange }) => {
  return (
    <Datepicker
      containerClassName="relative w-full max-w-[366px] bg-white border rounded-lg shadow-sm border-gray-300"
      inputClassName="w-full py-3 pl-4 pr-14 text-sm border-none focus:outline-none bg-white border rounded-lg shadow-sm border-gray-300"
      showShortcuts={true}
      showFooter={true}
      displayFormat="DD/MM/YYYY"
      primaryColor={"teal"}
      useRange={false}
      value={value}
      onChange={onChange}
    />
  );
};

export default DateRange;
