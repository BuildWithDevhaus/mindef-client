import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { useRemarkedPants } from "../../hooks/useRemarkedPants";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";
import TableAction from "../molecules/TableAction";
import { getCurrentSlug } from "../../helpers/windows";
import { useRemarkedShirt } from "../../hooks/useRemarkedShirt";
import { toastAlert } from "../../helpers/toastAlert";
import { ToastContainer } from "react-toastify";
import ConfirmModal from "../molecules/ConfirmModal";

export const shirtDeleteHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shirt Location:",
  "Disposal date:",
  "Reason for Delete Inventory:",
  "Remove from delete Inventory:",
];

export const pantsDeleteHeaders = [
  "Pants ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Pants Location:",
  "Disposal date:",
  "Reason for Delete Inventory:",
  "Remove from delete Inventory:",
];

const AdminDeleteInventory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShirt, setCurrentShirt] = useState<any>(null);
  const [currentPants, setCurrentPants] = useState<any>(null);
  const [currentReason, setCurrentReason] = useState<any>(null);


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

  const { getRemarkedShirts, updateRemarkedShirt, remarkedShirts } =
    useRemarkedShirt();
  const { remarkedPants, getRemarkedPants, updateRemarkedPants } =
    useRemarkedPants();
  const [filteredShirtData, setFilteredShirtData] = useState<any[]>([]);
  const [filteredPantsData, setFilteredPantsData] = useState<any[]>([]);

  useEffect(() => {
    if (state?.toastMessage) {
      toastAlert("success", state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [state, location.pathname]);

  useEffect(() => {
    getRemarkedShirts();
    getRemarkedPants();
  }, []);

  useEffect(() => {
    if (remarkedShirts.length > 0) {
      const filteredRemarkedShirts = filterShirtDataByDateRange(remarkedShirts);

      const mappedRemarkedShirts = filteredRemarkedShirts.map(
        (remarkedShirts) => {
          const handleEdit = () =>
            navigate(`${getCurrentSlug()}/edit/${remarkedShirts.rfidNo}`);
          const handleDelete = () => {
            setIsModalOpen(true);
            setCurrentShirt(remarkedShirts);
            setCurrentReason(remarkedShirts.deleteReason);
          };
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
            <TableAction
              showEdit
              showTrash
              onEdit={handleEdit}
              onDelete={handleDelete}
            />,
          ];
        }
      );

      setFilteredShirtData(mappedRemarkedShirts);
    }
  }, [remarkedShirts, shirtDateRange]);

  useEffect(() => {
    if (remarkedPants.length > 0) {
      const filteredRemarkedPants =
        filterRemarkedPantsDataByDateRange(remarkedPants);

      const mappedRemarkedPants = filteredRemarkedPants.map((remarkedPants) => {
        const handleEdit = () =>
          navigate(`${getCurrentSlug()}/edit/${remarkedPants.rfidNo}`);
        const handleDelete = () => {
          setIsModalOpen(true);
          setCurrentPants(remarkedPants);
          setCurrentReason(remarkedPants.deleteReason);
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
          <TableAction
            showEdit
            showTrash
            onEdit={handleEdit}
            onDelete={handleDelete}
          />,
        ];
      });

      setFilteredPantsData(mappedRemarkedPants);
    }
  }, [remarkedPants, pantsDateRange]);

  const confirmDelete = () => {
    if (currentShirt) {
      updateRemarkedShirt(currentShirt.rfidNo, {
        ...currentShirt,
        deleteReasonId: null,
        status: "available",
      });
      toastAlert("success", `RFID ${currentShirt.rfidNo} removed from Delete Inventory`);
    } else if (currentPants) {
      updateRemarkedPants(currentPants.rfidNo, {
        ...currentPants,
        deleteReasonId: null,
        status: "available",
      });
      toastAlert("success", `RFID ${currentPants.rfidNo} removed from Delete Inventory`);

    }
    setIsModalOpen(false);
    setCurrentShirt(null);
    setCurrentPants(null);
    setCurrentReason(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCurrentShirt(null);
    setCurrentPants(null);
    setCurrentReason(null);
  };

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
      {isModalOpen && (
        <ConfirmModal
          title="Are you sure?"
          message={`You want to delete RFID "${currentShirt?.rfidNo || currentPants?.rfidNo}" with reason "${currentReason?.name}" from delete inventory?`}
          confirmText="Yes"
          cancelText="No"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminDeleteInventory;


