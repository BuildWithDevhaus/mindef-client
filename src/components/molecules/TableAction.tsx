import React from 'react'
import ButtonIcon from './ButtonIcon'

const TableAction: React.FC<TableActionProps> = ({ itemId }) => {
  return (
    <div className="flex gap-4 justify-center">
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="pencil"
        onClick={() => alert(`Edited ${itemId}`)}
      />
      <ButtonIcon
        className="text-[#6DA893] hover:text-[#2F6D57]"
        icon="close"
        onClick={() => alert(`Deleted ${itemId}`)}
      />
    </div>
  )
}

export default TableAction
