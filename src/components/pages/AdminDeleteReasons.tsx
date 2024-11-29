import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import { deleteReasonData, deleteReasonHeaders } from "../../dummy/DeleteReasonDummy";


const AdminDeleteReasons: React.FC = () => {
  const [reasonSearchQuery, setreasonSearchQuery] = useState("");
  const [reasonRowsPerPage, setreasonRowsPerPage] = useState(5);

  const handlereasonSearchChange = (query: string) => {
    setreasonSearchQuery(query);
  };

  const handlereasonRowsPerPageChange = (value: number) => {
    setreasonRowsPerPage(value);
  };
  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
  ];

  return (
    <AdminLayout headingText="Overview Dashboard" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">reason Inventory</h2>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={reasonRowsPerPage}
          onRowsPerPageChange={handlereasonRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search reasons..."
          onChange={(e) => handlereasonSearchChange(e.target.value)}
        />
      </div>
      <Table
        headers={deleteReasonHeaders}
        data={deleteReasonData}
        rowsPerPage={reasonRowsPerPage}
        searchQuery={reasonSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminDeleteReasons;