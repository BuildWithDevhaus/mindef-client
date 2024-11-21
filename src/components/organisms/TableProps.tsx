import React from 'react';
import TableRow from '../molecules/TableRow';

const Table: React.FC<TableProps> = ({ headers, data, className }) => (
  <table className={`w-full border-collapse border text-[#475467] ${className || ''}`}>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="border-2 px-6 py-3 font-mono bg-[#FFFFFF] text-[12px]">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <TableRow key={index} rowData={row} className='text-[14px]' />
      ))}
    </tbody>
  </table>
);

export default Table;
