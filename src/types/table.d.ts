type TableCellProps = {
  content: string | number | JSX.Element;
  className?: string;
};

type TableRowProps = {
  rowData: Array<string | number | JSX.Element | Array<string>>;
  className?: string;
};

type TableProps = {
  headers: string[];
  data: Array<(string | number | JSX.Element)[]>;
  rowsPerPage?: number;
};
