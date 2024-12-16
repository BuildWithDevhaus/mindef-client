import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import StepName from "../../features/UserRegistration/StepName";
import StepGender from "../../features/UserRegistration/StepGender";
import StepDivision from "../../features/UserRegistration/StepDivision";
import { useStaff } from "../../hooks/useStaff";
import SelectActivity from "./SelectActivity";
import { StaffInputSchema } from "../../zod/staff";

const UserRegistrationForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<StaffInputSchema>({
    nricNo: "",
    name: "",
    divisionId: 0,
    gender: "",
  } as StaffInputSchema);

  const { step, nextStep } = useStep();
  const { nricNo, staffRegister } = useStaff();

  useEffect(() => {
    if (nricNo) {
      setUserDetails({ ...userDetails, nricNo });
    }
  }, [nricNo]);

  const handleChange = (userDetails: StaffInputSchema) => {
    setUserDetails(userDetails);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Change this into real logic
    nextStep("user-registration-select-activity");

    staffRegister(userDetails);
    setUserDetails({
      nricNo: "",
      name: "",
      divisionId: 0,
      gender: "",
    } as StaffInputSchema);
  };

  return (
    <>
      {step.includes("user-registration") && (
        <form
          name="user-registration-form"
          id="user-registration-form"
          className="h-full"
          onSubmit={handleSubmit}
        >
          {step === "user-registration-name" && (
            <StepName userDetails={userDetails} onConfirm={handleChange} nextStepDestination="user-registration-division" />
          )}
          {step === "user-registration-division" && (
            <StepDivision userDetails={userDetails} onConfirm={handleChange} nextStepDestination="user-registration-gender" backOption />
          )}
          {step === "user-registration-gender" && (
            <StepGender
              userDetails={userDetails}
              onConfirm={handleChange}
              onSubmit={() => handleSubmit}
              backOption
            />
          )}
          {step === "user-registration-select-activity" && (
            <SelectActivity />
          )}
        </form>
      )}
    </>
  );
};

export default UserRegistrationForm;
