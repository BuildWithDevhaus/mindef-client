import React, { useState } from "react";
import Table from "../organisms/TableProps";
import TableAction from "../molecules/TableAction";
import Sidebar from "../organisms/Sidebar";
import Breadcrumb from "../atoms/Breadcrumb";
import SearchBar from "../molecules/SearchBar";

const pageHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shoulder Length",
  "Sleeves Length",
  "Collar Length",
  "Shirt Location:",
  "Action:",
];
const pageData = [
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "16cm",
    "39cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "12cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "19cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "27cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "19cm",
    "18cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "29cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "12cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "27cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "16cm",
    "13cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "29cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "25cm",
    "19cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "12cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "13cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "13cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "17cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "18cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "29cm",
    "16cm",
    "Row: 2, Rack: B2, No: 32",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "16cm",
    "Row: 4, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9983847389} />,
  ],
];

const AdminHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="mx-auto flex">
      <Sidebar />
      <div className="w-full mt-10 mx-auto px-10">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Dashboard", url: "/dashboard" },
            { label: "Settings" },
            { label: "Profile", url: "/dashboard/profile" },
          ]}
        />

        <h1 className="text-2xl font-bold my-4">Register New Inventory</h1>
        <div className="mb-8">
          <SearchBar
            placeholder="Search"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Table
          headers={pageHeaders}
          data={pageData}
          rowsPerPage={5}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default AdminHome;