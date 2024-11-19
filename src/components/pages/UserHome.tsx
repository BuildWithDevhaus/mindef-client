import React from "react"
import UserLayout from "../templates/UserLayout"
import ScanNric from "../organisms/ScanNric"
import UserRegistrationForm from "../organisms/UserRegistrationForm"

const UserHome: React.FC = () => {
  return (
    <UserLayout>
      <ScanNric />
      <UserRegistrationForm />
    </UserLayout>
  )
}

export default UserHome
