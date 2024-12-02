interface TableProps {
  headers: string[];
  data: Array<(string | number | JSX.Element)[]>;
  rowsPerPage?: number;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableRowsPerPage?: boolean;
  enableDateRange?: boolean;
  initialSearchQuery?: string;
  onPageChange?: (page: number) => void;
  onSearchChange?: (query: string) => void;
  onRowsPerPageChange?: (value: number) => void;
  onDateRangeChange?: (value: any) => void;
  dateRange: DateRange;
}

interface TableRowProps {
  rowData: Array<string | number | JSX.Element | Array<string>>;
  className?: string;
};

interface TableCellProps {
  content: string | number | JSX.Element;
  className?: string;
};

interface TableActionProps {
  itemId: number;
  showEdit?: boolean;
  showDelete?: boolean;
  showTrash?: boolean;
};


