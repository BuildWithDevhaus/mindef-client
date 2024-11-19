import React, { ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerLayoutProps {
  children: ReactNode
  className?: string
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, className }) => {
  return (
    <div className={clsx('flex flex-col gap-14 p-7 rounded shadow-lg', className)}>
      {children}
    </div>
  )
}

export default ContainerLayout
