import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";
import { useUnitWing } from "../../hooks/useUnitWing";
import { toastAlert } from "../../helpers/toastAlert";
import { ToastContainer } from "react-toastify";
import ConfirmModal from "../molecules/ConfirmModal";

export const unitWingHeaders = [ "No:", "Name:", "Action:" ];

const AdminUnitWing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDivision, setCurrentDivision] = useState<any>(null);
  const { unitWings, getUnitWings, deleteUnitWing } = useUnitWing();
  const [filteredUnitWingData, setFilteredUnitWingData] = useState<any[]>([]);

  useEffect(() => {
    if (state?.toastMessage) {
      toastAlert("success", state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [state, location.pathname]);

  useEffect(() => {
    getUnitWings();
  }, []);


  const {
    searchQuery: unitWingSearchQuery,
    setSearchQuery: setDivisionSearchQuery,
    rowsPerPage: divisionRowsPerPage,
    setRowsPerPage: setDivisionRowsPerPage,
    dateRange: divisionDateRange,
    setDateRange: setDivisionDateRange,
    filterDataByDateRange: filterDivisionDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const handleDeleteClick = (division: any) => {
    setCurrentDivision(division);
    setIsModalOpen(true);
  };  

  const confirmDelete = () => {
    deleteUnitWing(currentDivision.id);
    toastAlert("success", `Unit/Wing "${currentDivision.name}" deleted successfully!`);
    setIsModalOpen(false);
    setCurrentDivision(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCurrentDivision(null);
  };

  useEffect(() => {
    if (unitWings.length > 0) {
      const filteredDivisions = filterDivisionDataByDateRange(unitWings);
      const mappedDivisions = filteredDivisions.map((division, index) => {
        
        return [
          index + 1,
          capitalizeFirstLetter(division.name),
          <TableAction
            showEdit
            showTrash
            onEdit={() => navigate(`${getCurrentSlug()}/edit/${division.id}`)}
            onDelete={() => handleDeleteClick(division)}
          />,
        ];
      });

      setFilteredUnitWingData(mappedDivisions);
    }
  }, [unitWings, divisionDateRange]);

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Unit/Wing", url: "/admin/unit-wing" },
  ];

  return (
    <AdminLayout headingText="Unit/Wing" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">List of Unit/Wing</h2>
        <ButtonPrimary
          onClick={() => {
            navigate("/admin/unit-wing/add");
          }}
        >
          Add Unit/Wing
        </ButtonPrimary>
      </div>
      <Table
        headers={unitWingHeaders}
        data={filteredUnitWingData}
        rowsPerPage={divisionRowsPerPage}
        enablePagination
        enableSearch
        enableRowsPerPage
        enableDateRange={false}
        initialSearchQuery={unitWingSearchQuery}
        onSearchChange={setDivisionSearchQuery}
        onRowsPerPageChange={setDivisionRowsPerPage}
        onDateRangeChange={setDivisionDateRange}
        dateRange={divisionDateRange}
      />
      {isModalOpen && (
        <ConfirmModal
          title="Delete Unit/Wing"
          message="Are you sure you want to delete this Unit/Wing?"
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

export default AdminUnitWing;
