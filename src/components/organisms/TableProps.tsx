// Table.tsx

import React, { useState } from "react";
import TableCell from "../atoms/TableCell";
import ButtonPrimary from "../atoms/ButtonPrimary";
import ButtonSecondary from "../atoms/ButtonSecondary";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import DateRange from "../atoms/DateRange";

const Table: React.FC<TableProps> = ({
  headers,
  data,
  rowsPerPage = 5,
  enablePagination = true,
  enableSearch = true,
  enableRowsPerPage = true,
  enableDateRange = true,
  initialSearchQuery = "",
  onPageChange,
  onSearchChange,
  onRowsPerPageChange,
  onDateRangeChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchQuery, setCurrentSearchQuery] =
    useState(initialSearchQuery);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);
  const [dateRange, setDateRange] = useState<any>(null);

  const filteredData = data.filter((row) =>
    row.some((cell) =>
      typeof cell === "string" || typeof cell === "number"
        ? cell
            .toString()
            .toLowerCase()
            .includes(currentSearchQuery.toLowerCase())
        : false
    )
  );

  const totalPages = Math.ceil(filteredData.length / currentRowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * currentRowsPerPage,
    currentPage * currentRowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange && onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange && onPageChange(newPage);
    }
  };

  const handleSearchChange = (query: string) => {
    setCurrentSearchQuery(query);
    onSearchChange && onSearchChange(query);
  };

  const handleRowsPerPageChange = (value: number) => {
    setCurrentRowsPerPage(value);
    onRowsPerPageChange && onRowsPerPageChange(value);
  };

  const handleDateRangeChange = (value: any) => {
    setDateRange(value);
    onDateRangeChange && onDateRangeChange(value);
  };

  return (
    <div>
      <div className="flex items-center justify-between" >
        <div>
          {enableRowsPerPage && (
            <div className="mb-8 flex items-center justify-between">
              <RowsPerPageDropdown
                rowsPerPage={currentRowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-8">
          {enableDateRange && (
            <div className="mb-8 flex items-center justify-between">
              <DateRange value={dateRange} onChange={handleDateRangeChange} />
            </div>
          )}
          {enableSearch && (
            <div className="mb-8 flex items-center justify-between">
              <SearchBar
                placeholder="Search..."
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <table className="min-w-full text-[#475467]">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-[12px] border-x-2 border-t-2 px-4 py-2 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  content={cell}
                  className="border-x-2 text-sm px-4 py-2"
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {enablePagination && (
        <div className="flex justify-between items-center px-6 py-4 border-x-2 border-b-2 border-gray-200">
          <span className="text-sm text-gray-600 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <div className="space-x-2 flex">
            <ButtonSecondary
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </ButtonSecondary>
            <ButtonPrimary
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </ButtonPrimary>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
