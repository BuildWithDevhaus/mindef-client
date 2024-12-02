import React from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { YearlyReportData, YearlyReportHeaders } from "../../dummy/YearlyReportDummy";
import useTableFilter from "../../hooks/useTableFilter";

const AdminYearlyReport: React.FC = () => {
  const {
    searchQuery: yearlyReportSearchQuery,
    setSearchQuery: setYearlyReportSearchQuery,
    rowsPerPage: yearlyReportRowsPerPage,
    setRowsPerPage: setYearlyReportRowsPerPage,
    dateRange: yearlyReportDateRange,
    setDateRange: setYearlyReportDateRange,
    filterDataByDateRange: filterYearlyReportDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, 8);
  
  const filteredYearlyReportData = filterYearlyReportDataByDateRange(YearlyReportData);
  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Reports", url: "/admin/Reports" },
    { label: "Yearly Report", url: "/admin/reports/Yearly-report" },
  ];

  return (
    <AdminLayout headingText="Yearly Report" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Inventory List</h2>
        <ButtonPrimary>Download Full Report</ButtonPrimary>
      </div>
      <Table
        headers={YearlyReportHeaders}
        data={filteredYearlyReportData}
        rowsPerPage={yearlyReportRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={true}
        initialSearchQuery={yearlyReportSearchQuery}
        onSearchChange={setYearlyReportSearchQuery}
        onRowsPerPageChange={setYearlyReportRowsPerPage}
        onDateRangeChange={setYearlyReportDateRange}
        dateRange={yearlyReportDateRange}
      />
    </AdminLayout>
  );
};

export default AdminYearlyReport;