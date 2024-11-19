import React, { ReactNode } from 'react'

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-[#ffffff] text-[#344054] hover:bg-[#ebebeb] font-semibold py-2 px-4 border-solid border-2 border-[#2F6D57] rounded-xl"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonSecondary
