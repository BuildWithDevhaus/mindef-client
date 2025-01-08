import { useRef, useState } from "react";
import {
  FileUpload,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { downloadXLSX } from "../../helpers/downloadXLSX";
import ButtonPrimary from "../atoms/ButtonPrimary";
import ButtonSecondary from "../atoms/ButtonSecondary";
import ExcelJS from "exceljs";
import { toastAlert } from "../../helpers/toastAlert";
import { ShirtBulkInput, shirtBulkInputSchema } from "../../zod/shirt";
import { z } from "zod";
import { PantsBulkInput, pantsBulkInputSchema } from "../../zod/pants";
import { useShirt } from "../../hooks/useShirt";
import { usePants } from "../../hooks/usePants";
import { AxiosError } from "axios";

interface ReactFileUploadProps {
  uploadType: "shirt" | "pants" | null;
}

export default function ReactFileUpload({ uploadType }: ReactFileUploadProps) {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const { createBulkShirts } = useShirt();
  const { createBulkPants } = usePants();

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files;

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const handleDownloadTemplate = () => {
    let headers: string[] = [];
    let data: any[] = [];
    let fileName = "";

    if (uploadType === "shirt") {
      headers = [
        "RFID No",
        "Belongs To",
        "Uniform Type",
        "Gender",
        "Shoulder Length",
        "Sleeve",
        "Collar Length",
        "Row",
        "Rack",
      ];
      data = [["RFID005", "Army", "Combat", "Male", 50, 67, 43, "F5", "F"]];
      fileName = "Shirt_Template";
    } else if (uploadType === "pants") {
      headers = [
        "RFID No",
        "Belongs To",
        "Uniform Type",
        "Gender",
        "Waist",
        "Length",
        "Row",
        "Rack",
      ];
      data = [["RFID013", "Air Force", "No. 1", "Male", 36, 110, "C6", "C"]];
      fileName = "Pants_Template";
    }

    downloadXLSX(headers, data, fileName);
  };

  const headerTemplate = () => {
    return <div></div>;
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    // const fileURL = URL.createObjectURL(file);
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex items-center" style={{ width: "40%" }}>
          {/* <img alt={file.name} role="presentation" src={fileURL} width={100} /> */}
          <span className="flex flex-column text-left ml-3">
            {file.name}
            {/* <small>{new Date().toLocaleDateString()}</small> */}
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex items-center flex-col">
        <i
          className="pi pi-file-import mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop XLSX File Here
        </span>
      </div>
    );
  };

  const handleUpload = async () => {
    if (fileUploadRef.current) {
      const files = fileUploadRef.current.getFiles();
      const file = files[0];

      if (!file) {
        toastAlert("error", "No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target?.result) {
          toastAlert("error", "File could not be read");
          return;
        }

        const buffer = e.target.result as ArrayBuffer;

        try {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);

          const data: Array<Record<string, any>> = [];
          const worksheet = workbook.getWorksheet(1);

          if (!worksheet) {
            toastAlert("error", "Worksheet not found");
            return;
          }

          const headers: string[] = [];
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
              row.eachCell((cell, colNumber) => {
                headers[colNumber - 1] = cell.text.trim();
              });
            } else {
              const rowData: Record<string, any> = {};
              row.eachCell((cell, colNumber) => {
                rowData[headers[colNumber - 1]] = cell.text.trim();
              });
              data.push(rowData);
            }
          });

          if (uploadType === "shirt") {
            const shirtData: ShirtBulkInput[] = z
              .array(shirtBulkInputSchema)
              .parse(data);
            const mappedShirtData = shirtData.map((shirt) => {
              return {
                rfidNo: shirt["RFID No"],
                belongsTo: shirt["Belongs To"],
                uniformType: shirt["Uniform Type"],
                gender: shirt.Gender.toLowerCase() as "male" | "female",
                shoulderLen: shirt["Shoulder Length"],
                sleeve: shirt.Sleeve,
                collarLen: shirt["Collar Length"],
                row: shirt.Row,
                rack: shirt.Rack,
                status: "available",
              };
            });

            const response = await createBulkShirts(mappedShirtData);

            toastAlert(
              "success",
              response.message || "Shirt data uploaded successfully"
            );
          } else {
            const pantsData: PantsBulkInput[] = z
              .array(pantsBulkInputSchema)
              .parse(data);
            const mappedPantsData = pantsData.map((pants) => {
              return {
                rfidNo: pants["RFID No"],
                belongsTo: pants["Belongs To"],
                uniformType: pants["Uniform Type"],
                gender: pants.Gender.toLowerCase() as "male" | "female",
                waist: pants.Waist,
                length: pants.Length,
                row: pants.Row,
                rack: pants.Rack,
                status: "available",
              };
            });

            const response = await createBulkPants(mappedPantsData);
            toastAlert(
              "success",
              response.message || "Pants data uploaded successfully"
            );
          }
        } catch (error) {
          let errorMessage;

          if (error instanceof z.ZodError && error.errors.length > 0) {
            const zodError = error.errors[0];

            if (zodError.path.length > 0 && zodError.message) {
              const rowIndex =
                typeof zodError.path[0] === "number" ? zodError.path[0] + 2 : 1;
              const column = zodError.path[1];

              errorMessage = `Error in row ${rowIndex}, column '${column}': ${zodError.message}`;
            } else {
              errorMessage = "Failed to upload shirt data";
            }
          } else if (
            error instanceof AxiosError &&
            error.response?.data.message.length > 0
          ) {
            const axiosError = error.response?.data.message[0];
            errorMessage = `Error in row ${axiosError.path[0] + 2}, column '${
              axiosError.path[1]
            }': ${axiosError.message}`;
          } else {
            errorMessage = "An unknown error occurred";
          }

          toastAlert("error", errorMessage);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      toastAlert("error", "No file uploaded");
    }
  };

  return (
    <div>
      <FileUpload
        ref={fileUploadRef}
        name="massUpload"
        multiple
        accept="image/*"
        maxFileSize={10000000}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
      />
      <div className="flex gap-3 justify-end">
        <ButtonSecondary onClick={handleDownloadTemplate}>
          Download Template
        </ButtonSecondary>
        <ButtonPrimary onClick={handleUpload}>Upload</ButtonPrimary>
      </div>
    </div>
  );
}
