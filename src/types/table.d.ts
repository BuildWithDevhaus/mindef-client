interface TableProps {
  headers: string[];
  data: Array<(string | number | JSX.Element)[]>;
  rowsPerPage?: number;
  searchQuery?: string;
};

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