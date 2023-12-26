import React from 'react';
import '../App.css'; // Імпортуємо стилі для модального вікна

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null; // Якщо isOpen дорівнює false, повертаємо null, щоб модальне вікно не відображалося

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>X</button> {/* Кнопка для закриття модального вікна, викликає функцію onClose */}
        {children} {/* Дітей, переданих у компонент, відображаємо всередині модального вікна */}
      </div>
    </div>
  );
};

export default Modal;
