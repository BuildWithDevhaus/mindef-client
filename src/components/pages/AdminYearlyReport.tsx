import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useYearlyReports } from "../../hooks/useYearlyReports";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";

const YearlyReportHeaders = [
  "S/N",
  "Uniform Type:",
  "Top/Bottom",
  "size",
  "Shirt Location:",
  "Gender:",
  "Reason",
  "Date of Disposal:",
];

const AdminYearlyReport: React.FC = () => {
  const {
    searchQuery: yearlyReportsSearchQuery,
    setSearchQuery: setYearlyReportsSearchQuery,
    rowsPerPage: yearlyReportsRowsPerPage,
    setRowsPerPage: setYearlyReportsRowsPerPage,
    dateRange: yearlyReportsDateRange,
    setDateRange: setYearlyReportsDateRange,
    filterDataByDateRange: filterYearlyReportsDataByDateRange,
  } = useTableFilter("", 5, { startDate: null, endDate: null }, "dateOfDisposal", 'year');

  const { yearlyReports, getYearlyReports } = useYearlyReports();
  const [filteredYearlyReportsData, setFilteredYearlyReportsData] = useState<any[]>([]);
  
  
    useEffect(() => {
      getYearlyReports();
    }, []);


    useEffect(() => {
      if (yearlyReports.length > 0) {
        const filteredYearlyReports = filterYearlyReportsDataByDateRange(yearlyReports);
  
        const mappedYearlyReports = filteredYearlyReports.map((yearlyReports, index) => {
          
          return [
            index + 1,
            capitalizeFirstLetter(yearlyReports.uniformType),
            capitalizeFirstLetter(yearlyReports.topBottom),
            `${yearlyReports.size}cm`,
            `Row: ${yearlyReports.row}, Rack: ${yearlyReports.rack}`,
            capitalizeFirstLetter(yearlyReports.gender),
            <StatusTag
              content={capitalizeFirstLetter(yearlyReports.deleteReason)}
              variant="danger"   
            />,
            new Date(yearlyReports.dateOfDisposal).toLocaleDateString("en-GB"),
          ];
        });
  
        setFilteredYearlyReportsData(mappedYearlyReports);
      }
    }, [yearlyReports, yearlyReportsDateRange]);
  
  useEffect(()=>{
    (async () => {
      try {
        if(!yearlyReportsDateRange.startDate) return;
        
        const date = new Date(yearlyReportsDateRange.startDate)
        const year = String(date.getFullYear());


        console.log(year);
        
        await getYearlyReports(year)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [yearlyReportsDateRange])
  
  const breadcrumbItems = [
    { label: "Admin Menu" },
    { label: "Reports", url: "/admin/reports" },
    { label: "Yearly Report", url: "/admin/reports/Yearly-report" },
  ];

  return (
    <AdminLayout headingText="Yearly Report" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Inventory List</h2>
        <ButtonPrimary>Download Full Report</ButtonPrimary>
      </div>
      <Table
        headers={YearlyReportHeaders}
        data={filteredYearlyReportsData}
        rowsPerPage={yearlyReportsRowsPerPage}
        enablePagination={true}
        enableSearch={true}
        enableRowsPerPage={true}
        enableDateRange={false}
        enableYearlyFilter={true}
        initialSearchQuery={yearlyReportsSearchQuery}
        onSearchChange={setYearlyReportsSearchQuery}
        onRowsPerPageChange={setYearlyReportsRowsPerPage}
        onDateRangeChange={setYearlyReportsDateRange}
        dateRange={yearlyReportsDateRange}
      />
    </AdminLayout>
  );
};

export default AdminYearlyReport;