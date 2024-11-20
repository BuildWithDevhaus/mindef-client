// components/atoms/TableCell.tsx
import React from 'react';

type TableCellProps = {
  content: string | number | JSX.Element;
  className?: string;
};

const TableCell: React.FC<TableCellProps> = ({ content, className }) => {
    // Check if the content is for Shirt Location and display line breaks
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
