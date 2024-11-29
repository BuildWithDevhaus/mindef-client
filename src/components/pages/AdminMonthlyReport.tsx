import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import { MonthlyReportData, MonthlyReportHeaders } from "../../dummy/MonthlyReportDummy";
import ButtonPrimary from "../atoms/ButtonPrimary";


const AdminMonthlyReport: React.FC = () => {
  const [monthlyReportSearchQuery, setMonthlyReportSearchQuery] = useState("");
  const [monthlyReportRowsPerPage, setMonthlyReportRowsPerPage] = useState(5);

  const handleMonthlySearchChange = (query: string) => {
    setMonthlyReportSearchQuery(query);
  };

  const handleMonthlyRowsPerPageChange = (value: number) => {
    setMonthlyReportRowsPerPage(value);
  };
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
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={monthlyReportRowsPerPage}
          onRowsPerPageChange={handleMonthlyRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search Monthlys..."
          onChange={(e) => handleMonthlySearchChange(e.target.value)}
        />
      </div>
      <Table
        headers={MonthlyReportHeaders}
        data={MonthlyReportData}
        rowsPerPage={monthlyReportRowsPerPage}
        searchQuery={monthlyReportSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminMonthlyReport;