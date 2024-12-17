import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";
import { useShirt } from "../../hooks/useShirt";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";
import { usePants } from "../../hooks/usePants";

export const shirtRegisterHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shoulder Length",
  "Sleeves Length",
  "Collar Length",
  "Shirt Location:",
  "Date Registered:",
  "Action:",
];

export const pantsRegisterHeaders = [
  "Pants ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Pants Length",
  "Waist Length",
  "Pants Location:",
  "Date Registered:",
  "Action:",
];

const AdminRegisterInventory: React.FC = () => {
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
  const { shirts, getShirts, deleteShirt } = useShirt();
  const { pants, getPants, deletePants } = usePants();
  const [filteredShirtData, setFilteredShirtData] = useState<any>([]);
  const [filteredPantsData, setFilteredPantsData] = useState<any>([]);

  useEffect(() => {
    getShirts();
    getPants();
  }, []);

  useEffect(() => {
    if (shirts.length > 0) {
      const mappedShirts = shirts.map((shirt) => {
        const editHandler = () => {
          navigate(`${getCurrentSlug()}/edit/${shirt.rfidNo}`);
        }

        const deleteHandler = () => {
          deleteShirt(shirt.rfidNo);
        } 

        return [
          shirt.rfidNo,
          shirt.belongsTo,
          capitalizeFirstLetter(shirt.gender),
          shirt.uniformType,
          shirt.shoulderLen,
          shirt.sleeve,
          shirt.collarLen,
          `Row: ${shirt.row}, Rack: ${shirt.rack}`,
          shirt.createdAt,
          <TableAction showEdit={true} showTrash={true} onEdit={editHandler} onDelete={deleteHandler} />,
        ];
      })
      const filteredShirtData = filterShirtDataByDateRange(mappedShirts);
      setFilteredShirtData(filteredShirtData);
    }
  }, [shirts]);

  useEffect(() => {
    if (pants.length > 0) {
      const mappedPants = pants.map((pants) => {
        const editHandler = () => {
          navigate(`${getCurrentSlug()}/edit/${pants.rfidNo}`);
        }

        const deleteHandler = () => { 
          deletePants(pants.rfidNo);
        }

        return [
          pants.rfidNo,
          pants.belongsTo,
          capitalizeFirstLetter(pants.gender),
          pants.uniformType,
          pants.waist,
          pants.length,
          `Row: ${pants.row}, Rack: ${pants.rack}`,
          pants.createdAt,
          <TableAction showEdit={true} showTrash={true} onEdit={editHandler} onDelete={deleteHandler} />,
        ];
      })
      const filteredPantsData = filterPantsDataByDateRange(mappedPants);
      setFilteredPantsData(filteredPantsData);
    }
  }, [pants]);

  const navigate = useNavigate();

  const handleRegisterUniform = () => {
  navigate("/admin/register-inventory/add");
  }

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Register New Inventory", url: "/admin/register-inventory" },
  ];

  return (
    <AdminLayout headingText="Register New Inventory" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Registered</h2>
        <ButtonPrimary onClick={handleRegisterUniform}>Register New Shirt</ButtonPrimary>
      </div>
      <Table
        headers={shirtRegisterHeaders}
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
        <ButtonPrimary onClick={handleRegisterUniform}>Register New Pants</ButtonPrimary>
      </div>
      <Table
        headers={pantsRegisterHeaders}
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

export default AdminRegisterInventory;