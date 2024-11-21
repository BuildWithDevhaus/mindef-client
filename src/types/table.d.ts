interface TableProps {
  headers: string[];
  data: Array<(string | number | JSX.Element)[]>;
  rowsPerPage?: number;
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
};