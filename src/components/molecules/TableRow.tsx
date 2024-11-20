// components/molecules/TableRow.tsx
import React from 'react';
import TableCell from '../atoms/TableCell';

type TableRowProps = {
    rowData: Array<string | number | JSX.Element | Array<string>>;
    className?: string;
};
const TableRow: React.FC<TableRowProps> = ({ rowData, className }) => (
    <tr className={className}>
      {rowData.map((cellContent, index) => {
        if (Array.isArray(cellContent)) {
          // Render Shirt Location with multiple rows
          return cellContent.map((locationItem, idx) => (
            <td key={`${index}-${idx}`} className="border px-2 py-1">{locationItem}</td>
          ));
        } else {
          // Regular data rendering
          return <TableCell key={index} content={cellContent} />;
        }
      })}
    </tr>
  );
  
  export default TableRow;
