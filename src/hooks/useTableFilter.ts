import { useState } from "react";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const parseDate = (date: string | Date) => {
  if (typeof date === "string") {
    const [day, month, year] = date.split("-").map(Number);
    return new Date(year, month - 1, day); // Correct day/month swapping
  }
  return date;
};

const useTableFilter = (
  initialSearchQuery: string,
  initialRowsPerPage: number,
  initialDateRange: DateRange,
  dateColumn: string = "createdAt" // Default to "createdAt"
) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);

  const filterDataByDateRange = (data: any[]) => {
    if (!dateRange.startDate || !dateRange.endDate) return data;

    const startDate =
      typeof dateRange.startDate === "string"
        ? parseDate(dateRange.startDate)
        : dateRange.startDate;

    const endDate =
      typeof dateRange.endDate === "string"
        ? parseDate(dateRange.endDate)
        : dateRange.endDate;

    console.log(startDate, endDate, 'date');

    return data.filter((item) => {
      const itemDate = new Date(item[dateColumn]); // Dynamically access the column
      console.log(itemDate, startDate, itemDate >= startDate);
      console.log(itemDate, endDate, itemDate <= endDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dateRange,
    setDateRange,
    filterDataByDateRange,
  };
};

export default useTableFilter;
