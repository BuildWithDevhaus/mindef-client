import React from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { pantsDeleteData, pantsDeleteHeaders, shirtDeleteData, shirtDeleteHeaders } from "../../dummy/DeleteInventoryDummy";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";

const AdminDeleteInventory: React.FC = () => {

  const navigate = useNavigate();

  const {
    searchQuery: shirtSearchQuery,
    setSearchQuery: setShirtSearchQuery,
    rowsPerPage: shirtRowsPerPage,
    setRowsPerPage: setShirtRowsPerPage,
    dateRange: shirtDateRange,
    setDateRange: setShirtDateRange,
    filterDataByDateRange: filterShirtDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, 5);
  const {
    searchQuery: pantsSearchQuery,
    setSearchQuery: setPantsSearchQuery,
    rowsPerPage: pantsRowsPerPage,
    setRowsPerPage: setPantsRowsPerPage,
    dateRange: pantsDateRange,
    setDateRange: setPantsDateRange,
    filterDataByDateRange: filterPantsDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, 5);

  const filteredShirtData = filterShirtDataByDateRange(shirtDeleteData);
  const filteredPantsData = filterPantsDataByDateRange(pantsDeleteData);

  const handleDeleteItems = () => {
    navigate("/admin/delete-inventory/add");
  }


  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Inventory", url: "/admin/delete-inventory" },
  ];

  return (
    <AdminLayout headingText="Delete Inventory" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Inventory</h2>
        <ButtonPrimary onClick={handleDeleteItems}>Delete Items</ButtonPrimary>
      </div>
      <Table
        headers={shirtDeleteHeaders}
        data={filteredShirtData}
        rowsPerPage={shirtRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={true}
        initialSearchQuery={shirtSearchQuery}
        onSearchChange={setShirtSearchQuery}
        onRowsPerPageChange={setShirtRowsPerPage}
        onDateRangeChange={setShirtDateRange}
        dateRange={shirtDateRange}
      />

      <div className="my-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Pants Inventory</h2>
        <ButtonPrimary onClick={handleDeleteItems}>Delete Items</ButtonPrimary>
      </div>
      <Table
        headers={pantsDeleteHeaders}
        data={filteredPantsData}
        rowsPerPage={pantsRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={true}
        initialSearchQuery={pantsSearchQuery}
        onSearchChange={setPantsSearchQuery}
        onRowsPerPageChange={setPantsRowsPerPage}
        onDateRangeChange={setPantsDateRange}
        dateRange={pantsDateRange}
      />
    </AdminLayout>
  );
};

export default AdminDeleteInventory;
