import React from "react";
import AdminLayout from "../templates/AdminLayout";
import SelectOptionPrimary from "../molecules/SelectOptionPrimary";
import ButtonPrimary from "../atoms/ButtonPrimary";
import SelectOptionItem from "../atoms/SelectOptionItem";
import ContainerLayout from "../templates/ContainerLayout";
import ButtonSecondary from "../atoms/ButtonSecondary";

const AddminConfigureDataRetention: React.FC = () => {
  const breadcrumbItems = [
    { label: "Admin Menu" },
    {
      label: "Configure Data Retention Period",
      url: "/admin/configure-data-rentention",
    },
  ];

  return (
    <AdminLayout
      headingText="Configure Data Retention Period"
      subText="Note: The default period for data retention is 12 months. E.g. on 1 Jan 2025, system will purge records </br> up to 31 Dec 2023. System will retain the records from 1 Jan to 31 Dec 2024."
      breadcrumbItems={breadcrumbItems}
    >
      <div className="mt-8">
        <ContainerLayout>
          <div className="flex flex-col items-center justify-between h-full gap-16 my-[20px]">
            <div className="max-w-[485px] flex flex-col gap-4">
              <label className="text-[32px] font-bold">
                Data Purge Retention Period
              </label>
              <SelectOptionPrimary
                placeholder="Select your Unit/Wing"
                className="w-full text-base"
              >
                <SelectOptionItem value="3 months" text="3 months" />
                <SelectOptionItem value="6 months" text="6 months" />
                <SelectOptionItem value="9 months" text="9 months" />
                <SelectOptionItem value="12 months" text="12 months" />
              </SelectOptionPrimary>
            </div>
            <div className="flex gap-4">
              <ButtonPrimary variant="large">Save Changes</ButtonPrimary>
              <ButtonSecondary variant="large">Back to Main</ButtonSecondary>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </AdminLayout>
  );
};

export default AddminConfigureDataRetention;