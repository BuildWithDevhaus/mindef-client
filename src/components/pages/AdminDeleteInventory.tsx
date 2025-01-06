import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";
import { useRemarkedPants } from "../../hooks/useRemarkedPants";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";
import TableAction from "../molecules/TableAction";
import { getCurrentSlug } from "../../helpers/windows";
import { useRemarkedShirt } from "../../hooks/useRemarkedShirt";

export const shirtDeleteHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shirt Location:",
  "Disposal date:",
  "Reason for Delete Inventory:",
  "Remove from Delete Inventory:",
];

export const pantsDeleteHeaders = [
  "Pants ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Pants Location:",
  "Disposal date:",
  "Reason for Delete Inventory:",
  "Remove from Delete Inventory:",
];

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
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "createdAt");
  const {
    searchQuery: pantsSearchQuery,
    setSearchQuery: setPantsSearchQuery,
    rowsPerPage: pantsRowsPerPage,
    setRowsPerPage: setPantsRowsPerPage,
    dateRange: pantsDateRange,
    setDateRange: setPantsDateRange,
    filterDataByDateRange: filterRemarkedPantsDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "createdAt");

  const { getRemarkedShirts, updateRemarkedShirt, remarkedShirts } = useRemarkedShirt();
  const { remarkedPants, getRemarkedPants, updateRemarkedPants } = useRemarkedPants();
  const [filteredShirtData, setFilteredShirtData] = useState<any[]>([]);
  const [filteredPantsData, setFilteredPantsData] = useState<any[]>([]);

  useEffect(() => {
    getRemarkedShirts();
    getRemarkedPants();
  }, []);

  useEffect(() => {
    if (remarkedShirts.length > 0) {
      const filteredRemarkedShirts = filterShirtDataByDateRange(remarkedShirts);
      
      const mappedRemarkedShirts = filteredRemarkedShirts.map((remarkedShirts) => {
        const handleEdit = () => navigate(`${getCurrentSlug()}/edit/${remarkedShirts.rfidNo}`);
        const handleDelete = () => {
          updateRemarkedShirt(remarkedShirts.rfidNo, {
            ...remarkedShirts,
            deleteReasonId: null,
            status: "available",
          });
        }
        return [
          remarkedShirts.rfidNo,
          remarkedShirts.belongsTo,
          capitalizeFirstLetter(remarkedShirts.gender),
          remarkedShirts.uniformType,
          `Row: ${remarkedShirts.row}, Rack: ${remarkedShirts.rack}`,
          new Date(remarkedShirts.disposalDate).toLocaleDateString("en-GB"),
          <StatusTag
            content={remarkedShirts.deleteReason.name}
            variant={"danger"}
          />,
          <TableAction showEdit showTrash onEdit={handleEdit} onDelete={handleDelete} />,
        ];
      });

      setFilteredShirtData(mappedRemarkedShirts);
    }
  }, [remarkedShirts, shirtDateRange]);

  useEffect(() => {
    if (remarkedPants.length > 0) {
      const filteredRemarkedPants = filterRemarkedPantsDataByDateRange(remarkedPants);

      const mappedRemarkedPants = filteredRemarkedPants.map((remarkedPants) => {
        const handleEdit = () => navigate(`${getCurrentSlug()}/edit/${remarkedPants.rfidNo}`);
        const handleDelete = () => {
          updateRemarkedPants(remarkedPants.rfidNo, {
            ...remarkedPants,
            deleteReasonId: null,
            status: "available",
          });
        };
        

        return [
          remarkedPants.rfidNo,
          remarkedPants.belongsTo,
          capitalizeFirstLetter(remarkedPants.gender),
          remarkedPants.uniformType,
          `Row: ${remarkedPants.row}, Rack: ${remarkedPants.rack}`,
          new Date(remarkedPants.disposalDate).toLocaleDateString("en-GB"),
          <StatusTag
            content={remarkedPants.deleteReason.name}
            variant={"danger"}
          />,
          <TableAction showEdit showTrash onEdit={handleEdit} onDelete={handleDelete} />,
        ];
      });

      setFilteredPantsData(mappedRemarkedPants);
    }
  }, [remarkedPants, pantsDateRange]);

  const handleDeleteItems = () => {
    navigate("/admin/delete-inventory/add");
  };

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Inventory", url: "/admin/delete-inventory" },
  ];

  return (
    <AdminLayout
      headingText="Delete Inventory"
      breadcrumbItems={breadcrumbItems}
    >
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
