import React from 'react'
import ButtonIcon from './ButtonIcon'

const TableAction: React.FC<TableActionProps> = ({ itemId, showEdit, showDelete, showTrash }) => {
  return (
    <div className="flex gap-4 justify-center">
      {showEdit && (
        <ButtonIcon
          className="text-[#6DA893] hover:text-[#2F6D57]"
          icon="pencil"
          onClick={() => alert(`Edited ${itemId}`)}
        />
      )}
      {showDelete && (
        <ButtonIcon
          className="text-[#6DA893] hover:text-[#2F6D57]"
          icon="close"
          onClick={() => alert(`Deleted ${itemId}`)}
        />
      )}
      {showTrash && (
        <ButtonIcon
          className="text-[#6DA893] hover:text-[#2F6D57]"
          icon="trash"
          onClick={() => alert(`Trash ${itemId}`)}
        />
      )}
    </div>
  );
};

export default TableAction;
