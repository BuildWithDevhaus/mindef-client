import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { unitWingHeaders } from "../../dummy/UnitWingDummy";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";
import { useDivision } from "../../hooks/useDivision";

const AdminUnitWing: React.FC = () => {
  const {
    searchQuery: divisionSearchQuery,
    setSearchQuery: setDivisionSearchQuery,
    rowsPerPage: divisionRowsPerPage,
    setRowsPerPage: setDivisionRowsPerPage,
    dateRange: divisionDateRange,
    setDateRange: setDivisionDateRange,
    filterDataByDateRange: filterDivisionDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const { divisions, getDivisions, deleteDivision } = useDivision();
  const [filteredDivisionData, setFilteredDivisionData] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDivisions();
  }, []);

  useEffect(() => {
    if (divisions.length > 0) {
      const filteredDivisions = filterDivisionDataByDateRange(divisions);

      const mappedDivisions = filteredDivisions.map((division, index) => {
        const handleEdit = () =>
          navigate(`${getCurrentSlug()}/edit/${division.id}`);
        const handleDelete = () => {
          deleteDivision(division.id);
        };

        return [
          index + 1,
          capitalizeFirstLetter(division.name),
          <TableAction
            showEdit
            showTrash
            onEdit={handleEdit}
            onDelete={handleDelete}
          />,
        ];
      });

      setFilteredDivisionData(mappedDivisions);
    }
  }, [divisions, divisionDateRange]);

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
        data={filteredDivisionData}
        rowsPerPage={divisionRowsPerPage}
        enablePagination
        enableSearch
        enableRowsPerPage
        enableDateRange={false}
        initialSearchQuery={divisionSearchQuery}
        onSearchChange={setDivisionSearchQuery}
        onRowsPerPageChange={setDivisionRowsPerPage}
        onDateRangeChange={setDivisionDateRange}
        dateRange={divisionDateRange}
      />
    </AdminLayout>
  );
};

export default AdminUnitWing;
