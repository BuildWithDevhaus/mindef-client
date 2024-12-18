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
  dateRange: { startDate: Date | null; endDate: Date | null };
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
  showEdit?: boolean;
  showDelete?: boolean;
  showTrash?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};


