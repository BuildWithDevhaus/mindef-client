import React from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { deleteReasonData, deleteReasonHeaders } from "../../dummy/DeleteReasonDummy";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const AdminDeleteReasons: React.FC = () => {
  const navigate = useNavigate();

  const {
    searchQuery: reasonSearchQuery,
    setSearchQuery: setReasonSearchQuery,
    rowsPerPage: reasonRowsPerPage,
    setRowsPerPage: setReasonRowsPerPage,
    dateRange: reasonDateRange,
    setDateRange: setReasonDateRange,
    filterDataByDateRange: filterReasonDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, [2,3]);

  const filteredReasonData = filterReasonDataByDateRange(deleteReasonData);

  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Delete Reasons", url: "/admin/delete-reasons" },
  ];

  return (
    <AdminLayout headingText="Overview Dashboard" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">reason Inventory</h2>
        <ButtonPrimary onClick={() => {navigate('/admin/delete-reasons/add')}}>Add Delete Reasoning</ButtonPrimary>
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
    </AdminLayout>
  );
};

export default AdminDeleteReasons;