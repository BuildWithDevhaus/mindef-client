import React from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { MonthlyReportData, MonthlyReportHeaders } from "../../dummy/MonthlyReportDummy";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";

const AdminMonthlyReport: React.FC = () => {
  const {
    searchQuery: monthlyReportSearchQuery,
    setSearchQuery: setMonthlyReportSearchQuery,
    rowsPerPage: monthlyReportRowsPerPage,
    setRowsPerPage: setMonthlyReportRowsPerPage,
    dateRange: monthlyReportDateRange,
    setDateRange: setMonthlyReportDateRange,
    filterDataByDateRange: filterMonthlyReportDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, [7, 8]);

  const filteredMonthlyReportData = filterMonthlyReportDataByDateRange(MonthlyReportData);
  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Reports", url: "/admin/Reports" },
    { label: "Monthly Report", url: "/admin/reports/monthly-report" },
  ];

  return (
    <AdminLayout headingText="Monthly Report" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Inventory List</h2>
        <ButtonPrimary>Download Full Report</ButtonPrimary>
      </div>
      <Table
        headers={MonthlyReportHeaders}
        data={filteredMonthlyReportData}
        rowsPerPage={monthlyReportRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={true}
        initialSearchQuery={monthlyReportSearchQuery}
        onSearchChange={setMonthlyReportSearchQuery}
        onRowsPerPageChange={setMonthlyReportRowsPerPage}
        onDateRangeChange={setMonthlyReportDateRange}
        dateRange={monthlyReportDateRange}
      />
    </AdminLayout>
  );
};

export default AdminMonthlyReport;
