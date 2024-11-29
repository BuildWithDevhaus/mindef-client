import React from "react"
import UserLayout from "../templates/UserLayout"
import ScanNric from "../organisms/ScanNric"
import UserRegistrationForm from "../organisms/UserRegistrationForm"
import SelectActivity from "../organisms/SelectActivity"
import ActivityManualMeasurement from "../organisms/ActivityManualMeasurement"
import ActivityAutoMeasurement from "../organisms/ActivityAutoMeasurement"
import ActivityDrawUniform from "../organisms/ActivityDrawUniform"
import UserExisting from "../organisms/UserExisting"

const UserHome: React.FC = () => {
  return (
    <UserLayout>
      <ScanNric />
      <UserRegistrationForm />
      <UserExisting />
      <SelectActivity />
      <ActivityManualMeasurement />
      <ActivityAutoMeasurement />
      <ActivityDrawUniform />
    </UserLayout>
  )
}

export default UserHome
