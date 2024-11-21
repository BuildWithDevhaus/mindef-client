import React from "react";
import TableCell from "../atoms/TableCell";


const TableRow: React.FC<TableRowProps> = ({ rowData, className }) => (
  <tr className={className}>
    {rowData.map((cellContent, index) => {
      if (Array.isArray(cellContent)) {
        return cellContent.map((locationItem, idx) => (
          <td key={`${index}-${idx}`} className="px-2 py-1">
            {locationItem}
          </td>
        ));
      } else {
        return <TableCell key={index} content={cellContent} />;
      }
    })}
  </tr>
);

export default TableRow;
