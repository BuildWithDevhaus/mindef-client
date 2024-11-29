import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import AdminLayout from "../templates/AdminLayout";
import { pantsDeleteData, pantsDeleteHeaders, shirtDeleteData, shirtDeleteHeaders } from "../../dummy/DeleteInventoryDummy";
import ButtonPrimary from "../atoms/ButtonPrimary";



const AdminDeleteInventory: React.FC = () => {
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

  const breadcrumbItems = [
    { label: "Admin Menu",},
    { label: "Delete Inventory", url: "/admin/delete-inventory" },
  ];

  return (
    <AdminLayout headingText="Delete Inventory" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Inventory</h2>
        <ButtonPrimary>Delete Items</ButtonPrimary>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={shirtRowsPerPage}
          onRowsPerPageChange={handleShirtRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search shirts..."
          onChange={(e) => handleShirtSearchChange(e.target.value)}
        />
      </div>
      <Table
        headers={shirtDeleteHeaders}
        data={shirtDeleteData}
        rowsPerPage={shirtRowsPerPage}
        searchQuery={shirtSearchQuery}
      />

      <div className="my-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Pants Inventory</h2>
        <ButtonPrimary>Delete Items</ButtonPrimary>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <RowsPerPageDropdown
          rowsPerPage={pantsRowsPerPage}
          onRowsPerPageChange={handlePantsRowsPerPageChange}
        />
        <SearchBar
          placeholder="Search pants..."
          onChange={(e) => handlePantsSearchChange(e.target.value)}
        />
      </div>
      <Table
        headers={pantsDeleteHeaders}
        data={pantsDeleteData}
        rowsPerPage={pantsRowsPerPage}
        searchQuery={pantsSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminDeleteInventory;