import React from "react";
import { useStep } from "../../hooks/useStep";
import ContainerLayout from "../templates/ContainerLayout";
import ButtonPrimary from "../atoms/ButtonPrimary";

const UserConfirmation: React.FC = () => {
  const { step, setStep } = useStep();

  const handleConfirm = () => {
    setStep("select-activity");
  };

  return (
    <>
      {step === "user-confirmation" && (
        <div className="flex flex-col items-center h-full">
          <label className="text-6xl font-bold">Confirm your Details</label>
          <div className="flex justify-center items-center h-full">
            <ContainerLayout className="p-12">
              {/* TODO: Use actual user details */}
              <div className="flex flex-col gap-14 w-[440px]">
                <div className="flex flex-col gap-2">
                  <label className="text-[#A3A3A3] text-2xl font-semibold">Full Name</label>
                  <p className="text-2xl font-semibold">Daniel Chow</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#A3A3A3] text-2xl font-semibold">Unit/Wing</label>
                  <p className="text-2xl font-semibold">9th Singapore Division</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#A3A3A3] text-2xl font-semibold">Gender</label>
                  <p className="text-2xl font-semibold">Male</p>
                </div>
                <ButtonPrimary variant="large" onClick={handleConfirm}>Confirm</ButtonPrimary>
              </div>
            </ContainerLayout>
          </div>
        </div>
      )}
    </>
  );
};

export default UserConfirmation;