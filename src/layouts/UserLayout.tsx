import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
  background?: boolean;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, background = true }) => {
  return (
    <div
      className={
        background
          ? "flex justify-center h-screen py-24 px-12 bg-user-bg bg-cover bg-right-bottom"
          : "flex justify-center h-screen py-24 px-12"
      }
    >
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
