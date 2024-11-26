import React from "react";
import IconSearch from "../atoms/IconSearch";
import InputField from "../atoms/SearchInput";

interface SearchBarProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search", onChange }) => {
  return (
    <div className="flex items-center w-full max-w-md px-2 py-1 bg-white border rounded-lg shadow-sm border-gray-300">
      <IconSearch />
      <InputField placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
