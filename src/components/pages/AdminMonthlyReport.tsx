import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useMonthlyReports } from "../../hooks/useMonthlyReports";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { downloadXLSX } from "../../helpers/downloadXLSX";

export const MonthlyReportHeaders = [
  "S/N",
  "Name",
  "Unit/Wing",
  "Uniform Type:",
  "Shirt Collar Length",
  "Pants Waist Length",
  "Gender:",
  "Last Drawn Date:",
  "Last Return Date:",
];

const AdminMonthlyReport: React.FC = () => {
  const {
    searchQuery: monthlyReportSearchQuery,
    setSearchQuery: setMonthlyReportSearchQuery,
    rowsPerPage: monthlyReportRowsPerPage,
    setRowsPerPage: setMonthlyReportRowsPerPage,
    dateRange: monthlyReportsDateRange,
    setDateRange: setMonthlyReportDateRange,
    filterDataByDateRange: filterMonthlyReportsDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "dateOfDrawing", 'month');

  const { monthlyReports, getMonthlyReports } = useMonthlyReports();
  const [filteredMonthlyReportsData, setFilteredMonthlyReportsData] = useState<
    any[]
  >([]);

  useEffect(() => {
    getMonthlyReports();
  }, []);

  useEffect(() => {
    if (monthlyReports.length > 0) {
      const filteredMonthlyReports = filterMonthlyReportsDataByDateRange(monthlyReports);

      const mappedMonthlyReports = filteredMonthlyReports.map(
        (monthlyReports, index) => {
          return [
            index + 1,
            capitalizeFirstLetter(monthlyReports.name),
            capitalizeFirstLetter(monthlyReports.division),
            capitalizeFirstLetter(monthlyReports.uniformType),
            `${monthlyReports.top}cm`,
            `${monthlyReports.bottom}cm`,
            capitalizeFirstLetter(monthlyReports.gender),
            new Date(monthlyReports.dateOfDrawing).toLocaleDateString("en-GB"),
            monthlyReports.dateOfReturn
              ? new Date(monthlyReports.dateOfReturn).toLocaleDateString(
                  "en-GB"
                )
              : "N/A",
          ];
        }
      );

      setFilteredMonthlyReportsData(mappedMonthlyReports);
    }
  }, [monthlyReports, monthlyReportsDateRange]);

  useEffect(() => {
    (async () => {
      try {
        if (!monthlyReportsDateRange.startDate) return;

        const date = new Date(monthlyReportsDateRange.startDate);
        const month = String(date.getMonth() + 1);
        const year = String(date.getFullYear());
        
        await getMonthlyReports(month, year)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [monthlyReportsDateRange]);

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Reports", url: "/admin/reports" },
    { label: "Monthly Report", url: "/admin/reports/monthly-report" },
  ];

  const handleDownloadReport = () => {
    const startDate = monthlyReportsDateRange.startDate ? new Date(monthlyReportsDateRange.startDate) : new Date();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const year = String(startDate.getFullYear()); 
  
    const fileName = `Monthly_Report_${month}_${year}`;
  
    downloadXLSX(MonthlyReportHeaders, filteredMonthlyReportsData, fileName);
  };
  

  return (
    <AdminLayout headingText="Monthly Report" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Inventory List</h2>
        <ButtonPrimary onClick={handleDownloadReport} >Download Full Report</ButtonPrimary>
      </div>
      <Table
        headers={MonthlyReportHeaders}
        data={filteredMonthlyReportsData}
        rowsPerPage={monthlyReportRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={false}
        enableMonthlyFilter={true}
        initialSearchQuery={monthlyReportSearchQuery}
        onSearchChange={setMonthlyReportSearchQuery}
        onRowsPerPageChange={setMonthlyReportRowsPerPage}
        onDateRangeChange={setMonthlyReportDateRange}
        dateRange={monthlyReportsDateRange}
      />
    </AdminLayout>
  );
};

export default AdminMonthlyReport;
