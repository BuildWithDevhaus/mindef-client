import React from 'react'
import clsx from 'clsx'

const Breadcrump: React.FC<BreadcrumpProps> = ({ menus, menusItem,className }) => {
  return (
    <div className={clsx(`flex gap-2 font-semibold text-[#838D95] text-base`, className)}>
      <span>{menus}</span>
      <span className='font-black text-center'>•</span>
      <span>{menusItem}</span>
    </div>
  )
}

export default Breadcrump
