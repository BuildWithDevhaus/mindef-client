import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";
import useTableFilter from "../../hooks/useTableFilter";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../molecules/ConfirmModal";
import { toastAlert } from "../../helpers/toastAlert";
import { ToastContainer } from "react-toastify";

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
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
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
  
  const { shirts, getShirts, deleteShirt } = useShirt();
  const { pants, getPants, deletePants } = usePants();
  const [filteredShirtData, setFilteredShirtData] = useState<any[]>([]);
  const [filteredPantsData, setFilteredPantsData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShirt, setCurrentShirt] = useState<any>(null);
  const [currentPants, setCurrentPants] = useState<any>(null);

  useEffect(() => {
    if (state?.toastMessage) {
      console.log("here");
      
      toastAlert("success", state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [state, location.pathname]);

  useEffect(() => {
    getShirts();
    getPants();
  }, []);

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCurrentShirt(null);
    setCurrentPants(null);
  };

  const confirmDelete = () => {
    if (currentShirt) {
      deleteShirt(currentShirt.rfidNo);
      toastAlert(
        "success",
        `RFID ${currentShirt.rfidNo} removed from Register Inventory`
      );
    } else if (currentPants) {
      deletePants(currentPants.rfidNo);
      toastAlert(
        "success",
        `RFID ${currentPants.rfidNo} removed from Register Inventory`
      );
    }
    setIsModalOpen(false);
    setCurrentShirt(null);
    setCurrentPants(null);
  };

  useEffect(() => {
    if (shirts.length > 0) {
      const filteredShirts = filterShirtDataByDateRange(shirts);

      const mappedShirts = filteredShirts.map((shirt) => {
        const handleEdit = () =>
          navigate(`${getCurrentSlug()}/edit/${shirt.rfidNo}`);
        const handleDelete = () => {
          setIsModalOpen(true);
          setCurrentShirt(shirt);
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
          <TableAction
            showEdit
            showTrash
            onEdit={handleEdit}
            onDelete={handleDelete}
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
        const editHandler = () =>
          navigate(`${getCurrentSlug()}/edit/${pants.rfidNo}`);
        const handleDelete = () => {
          setIsModalOpen(true);
          setCurrentPants(pants);
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
          <TableAction
            showEdit
            showTrash
            onEdit={editHandler}
            onDelete={handleDelete}
          />,
        ];
      });

      setFilteredPantsData(mappedPants);
    }
  }, [pants, pantsDateRange]);

  const handleRegisterUniform = () => navigate("/admin/register-inventory/add");

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Register New Inventory", url: "/admin/register-inventory" },
  ];

  return (
    <AdminLayout
      headingText="Register New Inventory"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Shirt Registered</h2>
        <ButtonPrimary onClick={handleRegisterUniform}>
          Register New Shirt
        </ButtonPrimary>
      </div>
      <Table
        headers={shirtRegisterHeaders}
        data={filteredShirtData}
        rowsPerPage={shirtRowsPerPage}
        enablePagination
        enableSearch
        enableRowsPerPage
        enableDateRange
        initialSearchQuery={shirtSearchQuery}
        onSearchChange={setShirtSearchQuery}
        onRowsPerPageChange={setShirtRowsPerPage}
        onDateRangeChange={setShirtDateRange}
        dateRange={shirtDateRange}
      />
      <div className="my-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Pants Registered</h2>
        <ButtonPrimary onClick={handleRegisterUniform}>
          Register New Pants
        </ButtonPrimary>
      </div>
      <Table
        headers={pantsRegisterHeaders}
        data={filteredPantsData}
        rowsPerPage={pantsRowsPerPage}
        enablePagination
        enableSearch
        enableRowsPerPage
        enableDateRange
        initialSearchQuery={pantsSearchQuery}
        onSearchChange={setPantsSearchQuery}
        onRowsPerPageChange={setPantsRowsPerPage}
        onDateRangeChange={setPantsDateRange}
        dateRange={pantsDateRange}
      />
      {isModalOpen && (
        <ConfirmModal
          title="Are you sure?"
          message={`Are you sure you want to delete RFID "${
            currentShirt?.rfidNo || currentPants?.rfidNo
          }"?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminRegisterInventory;
