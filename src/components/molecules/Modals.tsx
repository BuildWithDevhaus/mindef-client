// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <div className="flex flex-row-reverse">
          <button onClick={onClose} className="text-xl font-semibold absolute top-8 right-10">
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
