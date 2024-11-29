import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import {
  pantsInventoryData,
  pantsInventoryHeaders,
  shirtInventoryData,
  shirtInventoryHeaders,
} from "../../dummy/OverviewDummy";
import DateRange from "../atoms/DateRange";

const AdminHome: React.FC = () => {
  const [shirtSearchQuery, setShirtSearchQuery] = useState("");
  const [shirtRowsPerPage, setShirtRowsPerPage] = useState(5);

  const handleShirtSearchChange = (query: string) => {
    setShirtSearchQuery(query);
  };

  const handleShirtRowsPerPageChange = (value: number) => {
    setShirtRowsPerPage(value);
  };

  const [pantsSearchQuery, setPantsSearchQuery] = useState("");
  const [pantsRowsPerPage, setPantsRowsPerPage] = useState(5);

  const handlePantsSearchChange = (query: string) => {
    setPantsSearchQuery(query);
  };

  const handlePantsRowsPerPageChange = (value: number) => {
    setPantsRowsPerPage(value);
  };

  const [shirtDateRange, setShirtDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [pantsDateRange, setPantsDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleShirtDateChange = (value: any) => {
    setShirtDateRange(value);
  };

  const handlePantsDateChange = (value: any) => {
    setPantsDateRange(value);
  };

  const filterDataByDateRange = (
    data: any[],
    dateRange: { startDate: string | null; endDate: string | null }
  ) => {
    return data.filter((row) => {
      const lastDrawnDate = new Date(row[5]);
      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      if (startDate && lastDrawnDate < startDate) return false;
      if (endDate && lastDrawnDate > endDate) return false;

      return true;
    });
  };

  const filteredShirtData = filterDataByDateRange(
    shirtInventoryData,
    shirtDateRange
  );
  const filteredPantsData = filterDataByDateRange(
    pantsInventoryData,
    pantsDateRange
  );

  const breadcrumbItems = [
    { label: "Home" },
    { label: "Overview", url: "/admin" },
  ];

  return (
    <AdminLayout
      headingText="Overview Dashboard"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Inventory</h2>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={shirtRowsPerPage}
          onRowsPerPageChange={handleShirtRowsPerPageChange}
        />
        <div className="flex items-center gap-8">
          <DateRange value={shirtDateRange} onChange={handleShirtDateChange} />
          <SearchBar
            placeholder="Search shirts..."
            onChange={(e) => handleShirtSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Table
        headers={shirtInventoryHeaders}
        data={filteredShirtData}
        rowsPerPage={shirtRowsPerPage}
        searchQuery={shirtSearchQuery}
      />

      <div className="my-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Pants Inventory</h2>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={pantsRowsPerPage}
          onRowsPerPageChange={handlePantsRowsPerPageChange}
        />
        <div className="flex items-center gap-8">
          <DateRange value={pantsDateRange} onChange={handlePantsDateChange} />
          <SearchBar
            placeholder="Search pants..."
            onChange={(e) => handlePantsSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Table
        headers={pantsInventoryHeaders}
        data={filteredPantsData}
        rowsPerPage={pantsRowsPerPage}
        searchQuery={pantsSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminHome;
