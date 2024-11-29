import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { YearlyReportData, YearlyReportHeaders } from "../../dummy/YearlyReportDummy";


const AdminYearlyReport: React.FC = () => {
  const [YearlyReportSearchQuery, setYearlyReportSearchQuery] = useState("");
  const [YearlyReportRowsPerPage, setYearlyReportRowsPerPage] = useState(5);

  const handleYearlySearchChange = (query: string) => {
    setYearlyReportSearchQuery(query);
  };

  const handleYearlyRowsPerPageChange = (value: number) => {
    setYearlyReportRowsPerPage(value);
  };
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
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={YearlyReportRowsPerPage}
          onRowsPerPageChange={handleYearlyRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search Yearlys..."
          onChange={(e) => handleYearlySearchChange(e.target.value)}
        />
      </div>
      <Table
        headers={YearlyReportHeaders}
        data={YearlyReportData}
        rowsPerPage={YearlyReportRowsPerPage}
        searchQuery={YearlyReportSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminYearlyReport;