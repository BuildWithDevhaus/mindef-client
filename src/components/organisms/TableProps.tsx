// components/organisms/Table.tsx
import React, { useState } from "react";
import TableCell from "../atoms/TableCell";
import ButtonPrimary from "../atoms/ButtonPrimary";
import ButtonSecondary from "../atoms/ButtonSecondary";

type TableProps = {
  headers: string[];
  data: Array<(string | number | JSX.Element)[]>;
  rowsPerPage?: number;
};

const Table: React.FC<TableProps> = ({ headers, data, rowsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    console.log("helo");
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-2 text-left font-semibold"
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
                  className="border border-gray-200 px-4 py-2"
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
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
    </div>
  );
};

export default Table;
