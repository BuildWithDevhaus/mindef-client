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
    "9983747389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "16cm",
    "39cm",
    "Row: 2, Rack: B1, No: 30",
    <TableAction itemId={9983747389} />,
  ],
  [
    "9388394738",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "12cm",
    "16cm",
    "Row: 2, Rack: B5, No: 12",
    <TableAction itemId={9388394738} />,
  ],
  [
    "1183847389",
    "Navy",
    "Female",
    "Color Party",
    "19cm",
    "16cm",
    "16cm",
    "Row: 8, Rack: B2, No: 22",
    <TableAction itemId={1183847389} />,
  ],
  [
    "9983047893",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "27cm",
    "16cm",
    "Row: 4, Rack: B9, No: 26",
    <TableAction itemId={9983047893} />,
  ],
  [
    "9988847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "19cm",
    "18cm",
    "Row: 8, Rack: B2, No: 29",
    <TableAction itemId={9988847389} />,
  ],
  [
    "9498387389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "29cm",
    "16cm",
    "Row: 5, Rack: B5, No: 29",
    <TableAction itemId={9498387389} />,
  ],
  [
    "9838373899",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "12cm",
    "16cm",
    "Row: 6, Rack: B2, No: 16",
    <TableAction itemId={9838373899} />,
  ],
  [
    "9960847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "27cm",
    "Row: 2, Rack: B2, No: 27",
    <TableAction itemId={9960847389} />,
  ],
  [
    "7998384389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "16cm",
    "13cm",
    "Row: 2, Rack: B6, No: 29",
    <TableAction itemId={7998384389} />,
  ],
  [
    "8298387389",
    "Navy",
    "Female",
    "Color Party",
    "29cm",
    "16cm",
    "16cm",
    "Row: 6, Rack: B3, No: 29",
    <TableAction itemId={8298387389} />,
  ],
  [
    "9983473779",
    "Navy",
    "Female",
    "Color Party",
    "25cm",
    "19cm",
    "16cm",
    "Row: 9, Rack: B1, No: 01",
    <TableAction itemId={9983473779} />,
  ],
  [
    "9934737889",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 02",
    <TableAction itemId={9934737889} />,
  ],
  [
    "2980827089",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "12cm",
    "16cm",
    "Row: 2, Rack: B2, No: 11",
    <TableAction itemId={2980827089} />,
  ],
  [
    "9999384738",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "13cm",
    "16cm",
    "Row: 11, Rack: B8, No: 17",
    <TableAction itemId={9999384738} />,
  ],
  [
    "9839477389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "13cm",
    "Row: 5, Rack: B2, No: 29",
    <TableAction itemId={9839477389} />,
  ],
  [
    "9189315738",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "17cm",
    "Row: 2, Rack: B2, No: 29",
    <TableAction itemId={9189315738} />,
  ],
  [
    "9083847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "18cm",
    "16cm",
    "Row: 9, Rack: B9, No: 10",
    <TableAction itemId={9083847389} />,
  ],
  [
    "9983840089",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "29cm",
    "16cm",
    "Row: 4, Rack: B4, No: 32",
    <TableAction itemId={9983840089} />,
  ],
  [
    "9323438383",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "16cm",
    "Row: 4, Rack: B2, No: 29",
    <TableAction itemId={9323438383} />,
  ],
  [
    "9903040389",
    "Navy",
    "male",
    "Color Party",
    "1cm",
    "12cm",
    "21cm",
    "Row: 3, Rack: B4, No: 91",
    <TableAction itemId={9903040389} />,
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
            placeholder="Search for something..."
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