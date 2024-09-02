import React from "react";
import ReactDOM from "react-dom";

const Modalar = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {children}
        <button
          className="absolute top-0 right-0 p-2"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modalar;
