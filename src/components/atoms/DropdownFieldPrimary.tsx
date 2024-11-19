import React, { useState, ChangeEvent } from 'react';

interface DropdownFieldPrimaryProps {
  placeholder: string;
  className?: string;
}

const DropdownFieldPrimary: React.FC<DropdownFieldPrimaryProps> = ({ placeholder, className }) => {
  const [selectedOption, setSelectedOption] = useState('Select an option');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="relative w-full">
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className={`text-[36px] w-full py-4 px-4 border bg-[#F5F5F5] border-[#B7B7B7] rounded-lg shadow-md appearance-none focus:outline-none focus:border-[#2F6D57] ${className}`}
        style={{
          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'24\' height=\'24\'><path fill=\'%23B7B7B7\' d=\'M7 10l5 5 5-5z\'/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          backgroundSize: '60px',
        }}
      >
        <option value="Select an option" disabled>
         {placeholder}
        </option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      <p className="mt-2 text-lg text-gray-500">Selected: {selectedOption}</p>
    </div>
  );
};

export default DropdownFieldPrimary;
