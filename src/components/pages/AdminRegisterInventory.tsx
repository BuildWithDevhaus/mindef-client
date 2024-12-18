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
    filterData: filterShirtData,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const {
    searchQuery: pantsSearchQuery,
    setSearchQuery: setPantsSearchQuery,
    rowsPerPage: pantsRowsPerPage,
    setRowsPerPage: setPantsRowsPerPage,
    dateRange: pantsDateRange,
    setDateRange: setPantsDateRange,
    filterData: filterPantsData,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

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
      const filteredShirts = filterShirtData(shirts);
      const mappedShirts = filteredShirts.map((shirt) => {
        const handleEdit = () => {
          navigate(`${getCurrentSlug()}/edit/${shirt.rfidNo}`);
        };

        const handleDelete = () => {
          deleteShirt(shirt.rfidNo);
        };

        return [
          shirt.rfidNo,
          shirt.belongsTo,
          capitalizeFirstLetter(shirt.gender),
          shirt.uniformType,
          `${shirt.shoulderLen}cm`,
          `${shirt.sleeve}cm`,
          `${shirt.collarLen}cm`,
          `Row: ${shirt.row}, Rack: ${shirt.rack}`,
          new Date(shirt.createdAt).toLocaleDateString("en-GB"),
          <TableAction showEdit={true} showTrash={true} onEdit={handleEdit} onDelete={handleDelete} />,
        ];
      });
      setFilteredShirtData(mappedShirts);
    }
  }, [shirts, shirtDateRange, shirtSearchQuery]);

  useEffect(() => {
    if (pants.length > 0) {
      const filteredPants = filterPantsData(pants);
      const mappedPants = filteredPants.map((pants) => {
        const editHandler = () => {
          navigate(`${getCurrentSlug()}/edit/${pants.rfidNo}`);
        };

        const deleteHandler = () => {
          deletePants(pants.rfidNo);
        };

        return [
          pants.rfidNo,
          pants.belongsTo,
          capitalizeFirstLetter(pants.gender),
          pants.uniformType,
          `${pants.waist}cm`,
          `${pants.length}cm`,
          `Row: ${pants.row}, Rack: ${pants.rack}`,
          new Date(pants.createdAt).toLocaleDateString("en-GB"),
          <TableAction showEdit={true} showTrash={true} onEdit={editHandler} onDelete={deleteHandler} />,
        ];
      });
      setFilteredPantsData(mappedPants);
    }
  }, [pants, pantsDateRange, pantsSearchQuery]);

  const navigate = useNavigate();

  const handleRegisterUniform = () => {
    navigate("/admin/register-inventory/add");
  };

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

