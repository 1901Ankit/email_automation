// modal.js
import React from "react";
import "./index.css"; // Import the modal CSS

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className=" pt-5 bg-white rounded-lg  p-0 md:p-5 w-full md:w-1/2 h-fit  overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
