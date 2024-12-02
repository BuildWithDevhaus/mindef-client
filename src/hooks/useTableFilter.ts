import { useState } from "react";


const useTableFilter = (
  initialSearchQuery: string,
  initialRowsPerPage: number,
  initialDateRange: { startDate: string | null; endDate: string | null },
  dateColumnIndices: number | number[] 
) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const filterDataByDateRange = (data: any[]) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return data; 
    }

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    return data.filter((row) => {
      const indices = Array.isArray(dateColumnIndices) ? dateColumnIndices : [dateColumnIndices];

      return indices.some((index) => {
        const dateValue = new Date(row[index]);
        return dateValue >= startDate && dateValue <= endDate;
      });
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dateRange,
    setDateRange,
    filterDataByDateRange,
  };
};



export default useTableFilter;
