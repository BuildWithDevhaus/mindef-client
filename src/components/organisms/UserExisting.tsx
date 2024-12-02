import React, { useEffect, useState } from 'react'
import { useStep } from '../../hooks/useStep'
import UserConfirmation from '../../features/UserExistingFlow/UserConfirmation'
import UserSelectAction from '../../features/UserExistingFlow/UserSelectAction'
import UserCheckDimensions from '../../features/UserExistingFlow/UserCheckDimensions'
import StepResult from '../../features/ManualMeasurement/StepResult'
import NotFound from './NotFound'
import StepName from '../../features/UserRegistration/StepName'
import { useStaff } from '../../hooks/useStaff'
import { StaffSchema } from '../../zod/staff'
import StepDivision from '../../features/UserRegistration/StepDivision'
import StepGender from '../../features/UserRegistration/StepGender'

const UserExisting: React.FC = () => {
  const [userDetails, setUserDetails] = useState<StaffSchema>({
    nricNo: "",
    name: "",
    division: "",
    gender: "",
  });

  const { step, nextStep } = useStep();
  const { staff, staffUpdate } = useStaff();

  useEffect(() => {
    if (staff) {
      setUserDetails({ nricNo: staff.nricNo, name: staff.name, division: staff.division, gender: staff.gender });
    }
  }, [staff]);

  const handleChange = (userDetails: StaffSchema) => {
    setUserDetails(userDetails);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Change this into real logic
    nextStep("existing-user-confirmation");

    staffUpdate(userDetails);
    setUserDetails({ nricNo: "", name: "", division: "", gender: "" });
  };

  return (
    <>
      {step.includes("existing-user") && (
        <>
          {step === "existing-user-confirmation" && (
            <UserConfirmation />
          )}
          {step.includes("existing-user-edit") && (
            <form
              name="user-edit-form"
              id="user-edit-form"
              className="h-full"
              onSubmit={handleSubmit}
            >
              {step === "existing-user-edit-name" && (
                <StepName userDetails={userDetails} onConfirm={handleChange} nextStepDestination='existing-user-edit-division' />
              )}
              {step === "existing-user-edit-division" && (
                <StepDivision userDetails={userDetails} onConfirm={handleChange} nextStepDestination='existing-user-edit-gender' />
              )}
              {step === "existing-user-edit-gender" && (
                <StepGender userDetails={userDetails} onConfirm={handleChange} onSubmit={() => handleSubmit} />
              )}
            </form>
          )}
          {step === "existing-user-select-action" && (
            <UserSelectAction />
          )}
          {step === "existing-user-check-dimensions" && (
            <UserCheckDimensions />
          )}
          {step === "existing-user-result" && (
            <StepResult />
          )}
          {step === "existing-user-notfound" && (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}

export default UserExisting
