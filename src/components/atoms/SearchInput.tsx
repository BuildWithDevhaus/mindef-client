import React from 'react';

interface SearchInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<SearchInputProps> = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 text-sm border-none focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputField;
