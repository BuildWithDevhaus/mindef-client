import React, { ReactNode } from 'react'

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center h-screen py-24 px-12'>
      <main>{children}</main>
    </div>
  )
}

export default UserLayout