import React from "react";
import { useStep } from "../../hooks/useStep";
import ContainerLayout from "../../components/templates/ContainerLayout";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import ButtonSecondary from "../../components/atoms/ButtonSecondary";
import { useStaff } from "../../hooks/useStaff";
import { capitalizeFirstLetter } from "../../helpers/wordStructure";
import ButtonBack from "../../components/atoms/ButtonBack";

const UserConfirmation: React.FC<StepProps> = ({ backOption }) => {
  const { nextStep } = useStep();
  const { staff } = useStaff();

  const handleConfirm = () => {
    if (staff?.collarLen && staff.sleeve && staff.shoulderLen && staff.waist && staff.length) {
      nextStep("existing-user-select-action");
    } else {
      nextStep("existing-user-select-activity");
    }
  };

  const handleEdit = () => {
    nextStep("existing-user-edit-name");
  };

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <label className="text-6xl font-bold">Confirm your Details</label>
        <div className="flex justify-center items-center h-full">
          <ContainerLayout className="p-12">
            {/* TODO: Use actual user details */}
            <div className="flex flex-col gap-14 w-[440px]">
              <div className="flex flex-col gap-2">
                <label className="text-[#A3A3A3] text-2xl font-semibold">
                  Full Name
                </label>
                <p className="text-2xl font-semibold">{staff?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#A3A3A3] text-2xl font-semibold">
                  Unit/Wing
                </label>
                <p className="text-2xl font-semibold">{staff?.division}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#A3A3A3] text-2xl font-semibold">
                  Gender
                </label>
                <p className="text-2xl font-semibold">{staff ? capitalizeFirstLetter(staff.gender) : ""}</p>
              </div>
              <div className="flex flex-col gap-6">
                <ButtonPrimary variant="large" onClick={handleConfirm}>
                  Confirm
                </ButtonPrimary>
                <ButtonSecondary variant="large" onClick={handleEdit}>
                  Edit
                </ButtonSecondary>
              </div>
            </div>
          </ContainerLayout>
        </div>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default UserConfirmation;
