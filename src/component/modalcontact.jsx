// modal.js
import React from 'react';

const Modalcontact = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contact  pt-5" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {children}
      </div>
    </div>
  );
};

export default Modalcontact;
