import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import useTableFilter from "../../hooks/useTableFilter";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";


export const shirtInventoryHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shirt Location:",
  "Last Drawn Date:",
  "Status:",
];

export const pantsInventoryHeaders = [
  "Pants ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Pants Location:",
  "Last Drawn Date:",
  "Status:",
];


const AdminHome: React.FC = () => {
  const {
    searchQuery: shirtSearchQuery,
    setSearchQuery: setShirtSearchQuery,
    rowsPerPage: shirtRowsPerPage,
    setRowsPerPage: setShirtRowsPerPage,
    dateRange: shirtDateRange,
    setDateRange: setShirtDateRange,
    filterDataByDateRange: filterShirtDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "createdAt");

  const {
    searchQuery: pantsSearchQuery,
    setSearchQuery: setPantsSearchQuery,
    rowsPerPage: pantsRowsPerPage,
    setRowsPerPage: setPantsRowsPerPage,
    dateRange: pantsDateRange,
    setDateRange: setPantsDateRange,
    filterDataByDateRange: filterPantsDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "createdAt");

  const { shirts, getShirts } = useShirt();
  const { pants, getPants } = usePants();
  const [filteredShirtData, setFilteredShirtData] = useState<any[]>([]);
  const [filteredPantsData, setFilteredPantsData] = useState<any[]>([]);

  useEffect(() => {
    getShirts();
    getPants();
  }, []);

  useEffect(() => {
    if (shirts.length > 0) {
      const filteredShirts = filterShirtDataByDateRange(shirts);

      const mappedShirts = filteredShirts.map((shirt) => {
        return [
          shirt.rfidNo,
          shirt.belongsTo,
          capitalizeFirstLetter(shirt.gender),
          shirt.uniformType,
          `Row: ${shirt.row}, Rack: ${shirt.rack}`, 
          shirt.drawUniform.length > 0 
            ? new Date(shirt.drawUniform[shirt.drawUniform.length - 1].createdAt).toLocaleDateString("en-GB") 
            : "-",
          <StatusTag
            content={capitalizeFirstLetter(shirt.status)}
            variant={
              shirt.status === "remarked"
                ? "warning"
                : shirt.status === "loaned"
                ? "danger"
                : shirt.status === "available"
                ? "success"
                : "danger"
            }
          />,
        ];
      });

      setFilteredShirtData(mappedShirts);
    }
  }, [shirts, shirtDateRange]);

  useEffect(() => {
    if (pants.length > 0) {
      const filteredPants = filterPantsDataByDateRange(pants);

      const mappedPants = filteredPants.map((pants) => {
        return [
          pants.rfidNo,
          pants.belongsTo,
          capitalizeFirstLetter(pants.gender),
          pants.uniformType,
          `Row: ${pants.row}, Rack: ${pants.rack}`,
          pants.drawUniform.length > 0 
            ? new Date(pants.drawUniform[pants.drawUniform.length - 1].createdAt).toLocaleDateString("en-GB") 
            : "-",
          <StatusTag
            content={capitalizeFirstLetter(pants.status)}
            variant={
              pants.status === "remarked"
                ? "warning"
                : pants.status === "loaned"
                ? "danger"
                : pants.status === "available"
                ? "success"
                : "danger"
            }
          />,
        ];
      });

      setFilteredPantsData(mappedPants);
    }
  }, [pants, pantsDateRange]);

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
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Registered</h2>
      </div>
      <Table
        headers={shirtInventoryHeaders}
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
        <h2 className="text-2xl font-bold text-[#101828]">Pants Registered</h2>
      </div>
      <Table
        headers={pantsInventoryHeaders}
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

export default AdminHome;
