import React, { useState } from 'react';
import IconSearch from '../atoms/IconSearch';
import InputField from '../atoms/SearchInput';

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search' }) => {
    const [searchQuery, setSearchQuery] = useState(''); //searchQuery for the future maybe?
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      console.log('Search query:', e.target.value);
    };
  
    return (
      <div className="flex items-center w-full max-w-md px-2 py-1 bg-white border rounded-lg shadow-sm border-gray-300">
        <IconSearch />
        <InputField placeholder={placeholder} onChange={handleInputChange} />
      </div>
    );
  };
  
  export default SearchBar;