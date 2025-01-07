import ExcelJS from "exceljs";

export const downloadXLSX = async (headers: string[], data: any[], fileName: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report");

  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 12, color: { argb: "FFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2F6D57" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  data.forEach((row) => {
    const newRow = worksheet.addRow(row);
    newRow.eachCell((cell) => {
      cell.font = { size: 11 };
      cell.alignment = { vertical: "middle", horizontal: "left" };
    });
  });

  worksheet.columns = headers.map((header) => ({
    width: header.length + 5,
  }));

  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
};
