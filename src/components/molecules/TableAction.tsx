import React from 'react'
import ButtonIcon from './ButtonIcon'

const TableAction: React.FC<TableActionProps> = ({ showEdit, showTrash, onEdit, onDelete }) => {
  return (
    <div className="flex gap-4 justify-center">
      {showEdit && (
        <ButtonIcon
          className="text-[#6DA893] hover:text-[#2F6D57]"
          icon="pencil"
          onClick={onEdit}
        />
      )}
      {showTrash && (
        <ButtonIcon
          className="text-[#6DA893] hover:text-[#2F6D57]"
          icon="trash"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default TableAction;
