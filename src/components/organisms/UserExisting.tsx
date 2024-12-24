import React, { useState } from 'react'
import { useStep } from '../../hooks/useStep'
import UserConfirmation from '../../features/UserExistingFlow/UserConfirmation'
import UserSelectAction from '../../features/UserExistingFlow/UserSelectAction'
import UserCheckDimensions from '../../features/UserExistingFlow/UserCheckDimensions'
import StepResult from '../../features/ManualMeasurement/StepResult'
import NotFound from './NotFound'
import StepName from '../../features/UserRegistration/StepName'
import { useStaff } from '../../hooks/useStaff'
import { StaffInputSchema } from '../../zod/staff'
import StepDivision from '../../features/UserRegistration/StepDivision'
import StepGender from '../../features/UserRegistration/StepGender'
import SelectActivity from './SelectActivity'

const UserExisting: React.FC = () => {
  const [userDetails, setUserDetails] = useState<StaffInputSchema>({
    nricNo: "",
    name: "",
    divisionId: 1,
    gender: "",
  } as StaffInputSchema);

  const { step, nextStep } = useStep();
  const { staffUpdate } = useStaff();

  const handleChange = (userDetails: StaffInputSchema) => {
    setUserDetails(userDetails);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    staffUpdate({
      name: userDetails.name,
      divisionId: userDetails.divisionId,
      gender: userDetails.gender
    });
    nextStep("existing-user-confirmation");

    setUserDetails({
      nricNo: "",
      name: "",
      divisionId: 1,
      gender: "",
    } as StaffInputSchema);
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
                <StepName userDetails={userDetails} onConfirm={handleChange} nextStepDestination='existing-user-edit-division' backOption />
              )}
              {step === "existing-user-edit-division" && (
                <StepDivision userDetails={userDetails} onConfirm={handleChange} nextStepDestination='existing-user-edit-gender' backOption />
              )}
              {step === "existing-user-edit-gender" && (
                <StepGender userDetails={userDetails} onConfirm={handleChange} onSubmit={() => handleSubmit} backOption />
              )}
            </form>
          )}
          {step === "existing-user-select-action" && (
            <UserSelectAction backOption />
          )}
          {step === "existing-user-check-dimensions" && (
            <UserCheckDimensions backOption />
          )}
          {step === "existing-user-reselect" && (
            <SelectActivity drawUniform={false} backOption />
          )}
          {step === "existing-user-select-activity" && (
            <SelectActivity backOption />
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
