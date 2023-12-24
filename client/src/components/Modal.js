import React from 'react';
import '../App.css';  

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
