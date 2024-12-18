import { useState } from "react";

// Assuming you have a hook like this:
const useTableFilter = (
  initialQuery: string,
  initialRowsPerPage: number,
  initialDateRange: { startDate: Date | null; endDate: Date | null }
) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const filterDataBySearchQuery = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.rfidNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.belongsTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uniformType.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  };

  const filterDataByDateRange = (data: any[]) => {
    if (!dateRange.startDate || !dateRange.endDate) return data; 
    return data.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= (dateRange.startDate || new Date(0)) && itemDate <= (dateRange.endDate || new Date());
    });
  };

  const filterData = (data: any[]) => {
    let filteredData = filterDataBySearchQuery(data);
    filteredData = filterDataByDateRange(filteredData);
    return filteredData;
  };

  return {
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dateRange,
    setDateRange,
    filterDataByDateRange,
    filterDataBySearchQuery,
    filterData,
  };
};



export default useTableFilter;
