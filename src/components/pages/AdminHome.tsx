import React, { useState } from "react";
import Table from "../organisms/TableProps";
import SearchBar from "../molecules/SearchBar";
import RowsPerPageDropdown from "../atoms/RowsPerPageDropdown";
import ButtonPrimary from "../atoms/ButtonPrimary";
import AdminLayout from "../templates/AdminLayout";
import { pantsData, pantsHeaders, shirtData, shirtHeaders } from "../../dummy/AdminDummy";



const AdminHome: React.FC = () => {
  const [shirtSearchQuery, setShirtSearchQuery] = useState("");
  const [shirtRowsPerPage, setShirtRowsPerPage] = useState(5);

  const handleShirtSearchChange = (query: string) => {
    setShirtSearchQuery(query);
  };

  const handleShirtRowsPerPageChange = (value: number) => {
    setShirtRowsPerPage(value);
  };

  // State for the second table (pants)
  const [pantsSearchQuery, setPantsSearchQuery] = useState("");
  const [pantsRowsPerPage, setPantsRowsPerPage] = useState(5);

  const handlePantsSearchChange = (query: string) => {
    setPantsSearchQuery(query);
  };

  const handlePantsRowsPerPageChange = (value: number) => {
    setPantsRowsPerPage(value);
  };

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Inventory", url: "/inventory" },
    { label: "Clothing Registered" },
  ];

  return (
    <AdminLayout headingText="Register New Inventory" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Registered</h2>
        <ButtonPrimary>Register New Shirt</ButtonPrimary>
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
        headers={shirtHeaders}
        data={shirtData}
        rowsPerPage={shirtRowsPerPage}
        searchQuery={shirtSearchQuery}
      />

      <div className="my-8">
        <h2 className="text-2xl font-bold text-[#101828]">Pants Registered</h2>
        <ButtonPrimary>Register New Pants</ButtonPrimary>
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
        headers={pantsHeaders}
        data={pantsData}
        rowsPerPage={pantsRowsPerPage}
        searchQuery={pantsSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminHome;