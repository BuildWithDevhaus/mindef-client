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
import { useShirt } from '../../hooks/useShirt'
import { usePants } from '../../hooks/usePants'
import ExistingUserSelectUniformType from '../../features/UserExistingFlow/UserSelectUniformType'

const UserExisting: React.FC = () => {
  const [userDetails, setUserDetails] = useState<StaffInputSchema>({
    nricNo: "",
    name: "",
    divisionId: 1,
    gender: "",
  } as StaffInputSchema);

  const [uniformDetails, setUniformDetails] = useState({
    uniformType: "",
    shoulderLen: "",
    sleeve: "",
    waist: "",
    collarLen: "",
    length: "",
  });

  const { step, nextStep } = useStep();
  const { staff, staffUpdate } = useStaff();
  const { getShirtsByFilter } = useShirt();
  const { getPantsByFilter } = usePants();

  const handleUserValueChange = (userDetails: StaffInputSchema) => {
    setUserDetails(userDetails);
  };

  const handleUniformDetailsChange = (uniformDetails: ManualMeasurementForm) => {
    setUniformDetails(uniformDetails);
  };

  const handleEditProfileSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
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

  const handlePreviousRecordSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!staff) return;

    const shirts = await getShirtsByFilter(uniformDetails.uniformType, staff.gender, uniformDetails.collarLen, uniformDetails.sleeve, uniformDetails.shoulderLen);
    const pants = await getPantsByFilter(uniformDetails.uniformType, staff.gender, uniformDetails.waist, uniformDetails.length);

    if (shirts!.length > 0 || pants!.length > 0) {
      nextStep("existing-user-result");
    } else {
      nextStep("existing-user-notfound");
    }

    setUniformDetails({
      uniformType: "",
      shoulderLen: "",
      sleeve: "",
      waist: "",
      collarLen: "",
      length: ""
    })
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
              onSubmit={handleEditProfileSubmit}
            >
              {step === "existing-user-edit-name" && (
                <StepName userDetails={userDetails} onConfirm={handleUserValueChange} nextStepDestination='existing-user-edit-division' backOption />
              )}
              {step === "existing-user-edit-division" && (
                <StepDivision userDetails={userDetails} onConfirm={handleUserValueChange} nextStepDestination='existing-user-edit-gender' backOption />
              )}
              {step === "existing-user-edit-gender" && (
                <StepGender userDetails={userDetails} onConfirm={handleUserValueChange} onSubmit={() => handleEditProfileSubmit} backOption />
              )}
            </form>
          )}
          {step === "existing-user-select-action" && (
            <UserSelectAction backOption />
          )}
          {step.includes("existing-user-previous-record") && (
            <form
              name="previous-record-form"
              id="previous-record-form"
              className='h-full'
              onSubmit={handlePreviousRecordSubmit}
            >
              {step === "existing-user-previous-record-check-dimensions" && (
                <UserCheckDimensions manualMeasurementInput={uniformDetails} onConfirm={handleUniformDetailsChange} nextStepDirection='existing-user-previous-record-uniform-type' backOption />
              )}
              {step === "existing-user-previous-record-uniform-type" && (
                <ExistingUserSelectUniformType manualMeasurementInput={uniformDetails} onConfirm={handleUniformDetailsChange} onSubmit={() => handlePreviousRecordSubmit} backOption  />
              )}
            </form>
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
