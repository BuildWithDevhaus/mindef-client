import React from 'react'
import { useStep } from '../../hooks/useStep'
import UserConfirmation from '../../features/UserExistingFlow/UserConfirmation'
import UserSelectAction from '../../features/UserExistingFlow/UserSelectAction'
import UserCheckDimensions from '../../features/UserExistingFlow/UserCheckDimensions'
import StepResult from '../../features/ManualMeasurement/StepResult'
import NotFound from './NotFound'

const UserExisting: React.FC = () => {
  const { step } = useStep()

  return (
    <>
      {step.includes("existing-user") && (
        <>
          {step === "existing-user-confirmation" && (
            <UserConfirmation />
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
