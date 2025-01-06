import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useReason } from "../../hooks/useReason";
import { getCurrentSlug } from "../../helpers/windows";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";

export const deleteReasonHeaders = ["No:", "Reason", "Action:"];

const AdminDeleteReasons: React.FC = () => {
  const {
    searchQuery: reasonSearchQuery,
    setSearchQuery: setReasonSearchQuery,
    rowsPerPage: reasonRowsPerPage,
    setRowsPerPage: setReasonRowsPerPage,
    dateRange: reasonDateRange,
    setDateRange: setReasonDateRange,
    filterDataByDateRange: filterReasonDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const navigate = useNavigate();

  const { reasons, getReasons, deleteReason } = useReason();
  const [filteredReasonData, setFilteredReasonData] = useState<any[]>([]);

  useEffect(() => {
    getReasons();
  }, []);

  useEffect(() => {
    if (reasons.length > 0) {
      const filteredReasons = filterReasonDataByDateRange(reasons);

      const mappedReasons = filteredReasons.map((reason, index) => {
        const handleEdit = () =>
          navigate(`${getCurrentSlug()}/edit/${reason.id}`);
        const handleDelete = () => {
          deleteReason(reason.id);
        };

        return [
          index + 1,
          <StatusTag variant="danger" content={capitalizeFirstLetter(reason.name)} />, 
          <TableAction
            showEdit
            showTrash
            onEdit={handleEdit}
            onDelete={handleDelete}
          />,
        ];
      });

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
        <h2 className="text-2xl font-bold text-[#101828]">List of Reasons</h2>
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
    </AdminLayout>
  );
};

export default AdminDeleteReasons;
