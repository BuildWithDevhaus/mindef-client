import React, { useEffect, useState } from "react";
import Table from "../organisms/TableProps";
import AdminLayout from "../templates/AdminLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";
import useTableFilter from "../../hooks/useTableFilter";
import { useYearlyReports } from "../../hooks/useYearlyReports";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import StatusTag from "../atoms/StatusTag";
import { downloadXLSX } from "../../helpers/downloadXLSX";

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
  const [exportData, setExportData] = useState<any[]>([]);

  
  
    useEffect(() => {
      getYearlyReports();
    }, []);


    useEffect(() => {
      if (yearlyReports.length > 0) {
        const filteredYearlyReports = filterYearlyReportsDataByDateRange(yearlyReports);
    
        const mappedYearlyReportsForFrontend = filteredYearlyReports.map((yearlyReport, index) => {
          return [
            index + 1,
            capitalizeFirstLetter(yearlyReport.uniformType),
            capitalizeFirstLetter(yearlyReport.topBottom),
            `${yearlyReport.size}cm`,
            `Row: ${yearlyReport.row}, Rack: ${yearlyReport.rack}`,
            capitalizeFirstLetter(yearlyReport.gender),
            <StatusTag
              content={capitalizeFirstLetter(yearlyReport.deleteReason)}
              variant="danger"
            />,
            new Date(yearlyReport.dateOfDisposal).toLocaleDateString("en-GB"),
          ];
        });
    
        const mappedYearlyReportsForExport = filteredYearlyReports.map((yearlyReport, index) => {
          return [
            index + 1,
            capitalizeFirstLetter(yearlyReport.uniformType),
            capitalizeFirstLetter(yearlyReport.topBottom),
            `${yearlyReport.size}cm`,
            `Row: ${yearlyReport.row}, Rack: ${yearlyReport.rack}`,
            capitalizeFirstLetter(yearlyReport.gender),
            yearlyReport.deleteReason ? capitalizeFirstLetter(yearlyReport.deleteReason) : "N/A",
            new Date(yearlyReport.dateOfDisposal).toLocaleDateString("en-GB"),
          ];
        });
    
        setFilteredYearlyReportsData(mappedYearlyReportsForFrontend);
        setExportData(mappedYearlyReportsForExport); 
      }
    }, [yearlyReports, yearlyReportsDateRange]);
        
  useEffect(()=>{
    (async () => {
      try {
        if(!yearlyReportsDateRange.startDate) return;
        
        const date = new Date(yearlyReportsDateRange.startDate)
        const year = String(date.getFullYear());
        
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

  const handleDownloadReport = () => {
    const startDate = yearlyReportsDateRange.startDate ? new Date(yearlyReportsDateRange.startDate) : new Date();
    const year = String(startDate.getFullYear()); 

    const fileName = `Yearly_Report_${year}`;
    downloadXLSX(YearlyReportHeaders, exportData, fileName); 
  };

  return (
    <AdminLayout headingText="Yearly Report" breadcrumbItems={breadcrumbItems}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#101828]">Inventory List</h2>
        <ButtonPrimary onClick={handleDownloadReport}>Download Full Report</ButtonPrimary>
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