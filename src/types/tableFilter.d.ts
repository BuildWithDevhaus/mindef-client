interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface TableFilterHook {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  dateRange: DateRange;
  setDateRange: (value: DateRange) => void;
  filterDataByDateRange: (data: any[]) => any[];
}

interface RowsPerPageDropdownProps {
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
}
