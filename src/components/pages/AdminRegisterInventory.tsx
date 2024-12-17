import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { pantsRegisterData, pantsRegisterHeaders, shirtRegisterHeaders } from "../../dummy/RegisterInventoryDummy";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";
import { useShirt } from "../../hooks/useShirt";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";

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
  const [filteredShirtData, setFilteredShirtData] = useState<any>([]);

  useEffect(() => {
    getShirts();
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

  // const filteredShirtData = filterShirtDataByDateRange(shirtRegisterData);
  const filteredPantsData = filterPantsDataByDateRange(pantsRegisterData);

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