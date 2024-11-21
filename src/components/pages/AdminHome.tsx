import React from "react";
import Table from "../organisms/TableProps";
import ButtonIcon from "../molecules/ButtonIcon";

const pageHeaders = [
  "Shirt ID:",
  "Belongs To:",
  "Gender:",
  "Uniform Type:",
  "Shoulder Length",
  "Sleeves Length",
  "Collar Length",
  "Shirt Location:",
  "Action",
];
const pageData = [
  [
    "9983847389",
    "Airforce",
    "Male",
    "No.1",
    "16cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <div className="flex gap-4 justify-center">
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="pencil"
        onClick={() => alert("Edited")}
      />
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="close"
        onClick={() => alert("Deleted")}
      />
    </div>,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <div className="flex gap-4 justify-center">
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="pencil"
        onClick={() => alert("Edited")}
      />
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="close"
        onClick={() => alert("Deleted")}
      />
    </div>,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "16cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <div className="flex gap-4 justify-center">
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="pencil"
        onClick={() => alert("Edited")}
      />
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="close"
        onClick={() => alert("Deleted")}
      />
    </div>,
  ],
  [
    "9983847389",
    "Navy",
    "Female",
    "Color Party",
    "1cm",
    "16cm",
    "16cm",
    "Row: 2, Rack: B2, No: 29",
    <div className="flex gap-4 justify-center">
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="pencil"
        onClick={() => alert("Edited")}
      />
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="close"
        onClick={() => alert("Deleted")}
      />
    </div>,
  ],
];

const AdminHome: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Page 1 Inventory</h1>
      <Table headers={pageHeaders} data={pageData} />
    </div>
  );
};

export default AdminHome;
