import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import { unitWingData, unitWingHeaders } from "../../dummy/UnitWingDummy";


const AdminUnitWing: React.FC = () => {
  const [unitWinghQuery, setunitWinghQuery] = useState("");
  const [shirtRowsPerPage, setShirtRowsPerPage] = useState(5);

  const handleunitWinghChange = (query: string) => {
    setunitWinghQuery(query);
  };

  const handleShirtRowsPerPageChange = (value: number) => {
    setShirtRowsPerPage(value);
  };
  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Unit/Wing", url: "/admin/unit-wing" },
  ];

  return (
    <AdminLayout headingText="Unit/Wing" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">List of Unit/Wing</h2>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={shirtRowsPerPage}
          onRowsPerPageChange={handleShirtRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search shirts..."
          onChange={(e) => handleunitWinghChange(e.target.value)}
        />
      </div>
      <Table
        headers={unitWingHeaders}
        data={unitWingData}
        rowsPerPage={shirtRowsPerPage}
        searchQuery={unitWinghQuery}
      />
    </AdminLayout>
  );
};

export default AdminUnitWing;