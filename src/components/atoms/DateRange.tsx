import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DateRangeProps {
  value: DateValueType;
  onChange: (value: DateValueType) => void;
  format?: string;
  showFooter?: boolean;
  showShortcuts?: boolean;
  asSingle?: boolean;
}

const DateRange: React.FC<DateRangeProps> = ({ value, onChange, format = "MM/DD/YYYY", showFooter = true, showShortcuts = true, asSingle = false }) => {
  return (
    <Datepicker
      containerClassName="relative w-full max-w-[366px] bg-white border rounded-lg shadow-sm border-gray-300"
      inputClassName="w-full py-3 pl-4 pr-14 text-sm border-none focus:outline-none bg-white border rounded-lg shadow-sm border-gray-300"
      showShortcuts={showShortcuts}
      showFooter={showFooter}
      displayFormat={format}
      primaryColor={"teal"}
      useRange={false}
      value={value}
      asSingle={asSingle}
      onChange={onChange}
    />
  );
};

export default DateRange;
