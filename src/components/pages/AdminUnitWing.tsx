import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import { unitWingData, unitWingHeaders } from "../../dummy/UnitWingDummy";
import useTableFilter from "../../hooks/useTableFilter";
import ButtonPrimary from "../atoms/ButtonPrimary";



const AdminUnitWing: React.FC = () => {

  const navigate = useNavigate();

  const {
    searchQuery: unitWingSearchQuery,
    setSearchQuery: setUnitWingSearchQuery,
    rowsPerPage: unitWingRowsPerPage,
    setRowsPerPage: setUnitWingRowsPerPage,
    dateRange: unitWingDateRange,
    setDateRange: setUnitWingDateRange,
    filterDataByDateRange: filterUnitWingDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, [2,3]);

  const filteredUnitWingData = filterUnitWingDataByDateRange(unitWingData);
  const breadcrumbItems = [
    { label: "Admin Menu"},
    { label: "Unit/Wing", url: "/admin/unit-wing" },
  ];

  return (
    <AdminLayout headingText="Unit/Wing" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">List of Unit/Wing</h2>
        <ButtonPrimary onClick={() => {navigate('/admin/unit-wing/add')}}>Add Unit/Wing</ButtonPrimary>
      </div>
      <Table
        headers={unitWingHeaders}
        data={filteredUnitWingData}
        rowsPerPage={unitWingRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={false}
        initialSearchQuery={unitWingSearchQuery}
        onSearchChange={setUnitWingSearchQuery}
        onRowsPerPageChange={setUnitWingRowsPerPage}
        onDateRangeChange={setUnitWingDateRange}
        dateRange={unitWingDateRange}
      />
    </AdminLayout>
  );
};

export default AdminUnitWing;