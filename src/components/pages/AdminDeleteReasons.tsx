import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";
import { useReason } from "../../hooks/useReason";
import { getCurrentSlug } from "../../helpers/windows";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../molecules/ConfirmModal";
import { toastAlert } from "../../helpers/toastAlert";

export const deleteReasonHeaders = [ "No:", "Reason", "Action:"];

const AdminDeleteReasons: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const { reasons, getReasons, deleteReason } = useReason();
  const [filteredReasonData, setFilteredReasonData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState<any>(null);

  useEffect(() => {
    if (state?.toastMessage) {
      toastAlert("success", state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [state, location.pathname]);

  useEffect(() => {
    getReasons();
  }, []);

  const {
    searchQuery: reasonSearchQuery,
    setSearchQuery: setReasonSearchQuery,
    rowsPerPage: reasonRowsPerPage,
    setRowsPerPage: setReasonRowsPerPage,
    dateRange: reasonDateRange,
    setDateRange: setReasonDateRange,
    filterDataByDateRange: filterReasonDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const handleDeleteClick = (reason: any) => {
    setCurrentReason(reason);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentReason) {
      deleteReason(currentReason.id);
      toastAlert("success", `Reason "${currentReason.name}" deleted successfully!`);
      setIsModalOpen(false);
      setCurrentReason(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCurrentReason(null);
  };

  useEffect(() => {
    if (reasons.length > 0) {
      const filteredReasons = filterReasonDataByDateRange(reasons);

      const mappedReasons = filteredReasons.map((reason, index) => [
        index + 1,
        <StatusTag
          variant="danger"
          content={capitalizeFirstLetter(reason.name)}
        />,
        <TableAction
          showEdit
          showTrash
          onEdit={() => navigate(`${getCurrentSlug()}/edit/${reason.id}`)}
          onDelete={() => handleDeleteClick(reason)}
        />,
      ]);

      setFilteredReasonData(mappedReasons);
    }
  }, [reasons, reasonDateRange]);

  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
  ];

  return (
    <AdminLayout
      headingText="Overview Dashboard"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Reason Inventory</h2>
        <ButtonPrimary
          onClick={() => {
            navigate("/admin/delete-reasons/add");
          }}
        >
          Add Delete Reasoning
        </ButtonPrimary>
      </div>
      <Table
        headers={deleteReasonHeaders}
        data={filteredReasonData}
        rowsPerPage={reasonRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={false}
        initialSearchQuery={reasonSearchQuery}
        onSearchChange={setReasonSearchQuery}
        onRowsPerPageChange={setReasonRowsPerPage}
        onDateRangeChange={setReasonDateRange}
        dateRange={reasonDateRange}
      />
      {isModalOpen && (
        <ConfirmModal
          title="Are you sure?"
          message={`You want to delete the reason "${currentReason?.name}"?`}
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

export default AdminDeleteReasons;
