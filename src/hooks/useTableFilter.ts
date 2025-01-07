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
  dateColumn: string = "createdAt", // Default to "createdAt"
  filterFormat: 'day' | 'month' | 'year' = 'day'
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

    return data.filter((item) => {
      const itemDate = new Date(item[dateColumn]); // Dynamically access the column

      if (filterFormat === 'day') {
        return itemDate >= startDate && itemDate <= endDate;
      }

      if (filterFormat === 'month') {
        const itemMonth = itemDate.getMonth();
        const itemYear = itemDate.getFullYear();

        const startMonth = startDate.getMonth();
        const startYear = startDate.getFullYear();

        const endMonth = endDate.getMonth();
        const endYear = endDate.getFullYear();

        const isAfterStart =
          itemYear > startYear ||
          (itemYear === startYear && itemMonth >= startMonth);

        const isBeforeEnd =
          itemYear < endYear ||
          (itemYear === endYear && itemMonth <= endMonth);

        return isAfterStart && isBeforeEnd;
      }

      if (filterFormat === 'year') {
        const itemYear = itemDate.getFullYear();
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();

        return itemYear >= startYear && itemYear <= endYear;
      }

      return false;
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
