import React, { useRef, useState } from "react";
import { useStep } from "../../hooks/useStep";
import Summary from "../../features/UserRegistration/Summary";
import StepName from "../../features/UserRegistration/StepName";
import StepGender from "../../features/UserRegistration/StepGender";
import StepDivision from "../../features/UserRegistration/StepDivision";

const UserRegistrationForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    division: "",
    gender: "",
  });

  const { step, setStep } = useStep();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (userDetails: UserDetails) => {
    setUserDetails(userDetails);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Change this into real logic
    setStep("user-registration-success");
  };

  return (
    <>
      {step.includes("user-registration") && (
        <form
          ref={formRef}
          name="user-registration-form"
          id="user-registration-form"
          className="h-full"
          onSubmit={handleSubmit}
        >
          {step === "user-registration-name" && (
            <StepName userDetails={userDetails} onConfirm={handleChange} />
          )}
          {step === "user-registration-division" && (
            <StepDivision userDetails={userDetails} onConfirm={handleChange} />
          )}
          {step === "user-registration-gender" && (
            <StepGender
              userDetails={userDetails}
              onConfirm={handleChange}
              onSubmit={() => formRef.current?.requestSubmit()}
            />
          )}
          {step === "user-registration-success" && (
            <Summary userDetails={userDetails} />
          )}
        </form>
      )}
    </>
  );
};

export default UserRegistrationForm;
