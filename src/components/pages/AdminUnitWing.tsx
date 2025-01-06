import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";
import TableAction from "../molecules/TableAction";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import { getCurrentSlug } from "../../helpers/windows";
import { useUnitWing } from "../../hooks/useUnitWing";

export const unitWingHeaders = [ "No:", "Name:", "Action:" ];

const AdminUnitWing: React.FC = () => {
  const {
    searchQuery: unitWingSearchQuery,
    setSearchQuery: setDivisionSearchQuery,
    rowsPerPage: divisionRowsPerPage,
    setRowsPerPage: setDivisionRowsPerPage,
    dateRange: divisionDateRange,
    setDateRange: setDivisionDateRange,
    filterDataByDateRange: filterDivisionDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null });

  const { unitWings, getUnitWings, deleteUnitWing } = useUnitWing();
  const [filteredUnitWingData, setFilteredUnitWingData] = useState<any[]>([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    getUnitWings();
  }, []);

  useEffect(() => {
    if (unitWings.length > 0) {
      const filteredDivisions = filterDivisionDataByDateRange(unitWings);

      const mappedDivisions = filteredDivisions.map((division, index) => {
        const handleEdit = () =>
          navigate(`${getCurrentSlug()}/edit/${division.id}`);
        const handleDelete = () => {
          deleteUnitWing(division.id);
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
    </AdminLayout>
  );
};

export default AdminUnitWing;
