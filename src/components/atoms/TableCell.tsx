import React from 'react';

const TableCell: React.FC<TableCellProps> = ({ content, className }) => {
    const formatLocation = (location: string) => {
      return location.split(',').map((part, index) => (
        <div key={index}>{part.trim()}</div>
      ));
    };
  
    return (
      <td className={`text-center border-2  px-6 py-4 bg-[#F9FAFB] ${className || ''}`}>
        {typeof content === 'string' && content.includes('Row') ? formatLocation(content) : content}
      </td>
    );
  };

export default TableCell;
