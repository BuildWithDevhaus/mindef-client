import React from "react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="rounded-md px-5 py-2 bg-[#2F6D57] hover:bg-[#073826] text-white font-semibold border-solid border-2 border-[#2F6D57]"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="rounded-md px-5 py-2 bg-[#ffffff] hover:bg-[#ebebeb] text-[#344054] font-semibold border-solid border-2 border-[#2F6D57]"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
