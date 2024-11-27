import React from 'react'

const RowsPerPageDropdown: React.FC<RowsPerPageDropdownProps> = ( {rowsPerPage,  onRowsPerPageChange}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="rowsPerPage" className="text-sm">
        Show
      </label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className="px-2 py-1 border rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
      <span className="text-sm">Entries</span>
    </div>
  )
}

export default RowsPerPageDropdown
