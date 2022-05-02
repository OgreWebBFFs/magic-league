import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';

const Modal = ({ onClose, children }) => {
  return createPortal(
    <div className="modal active">
      <div className="modal__overlay overlay" onClick={onClose}></div>
      <div className="modal__content">
          <Button className="modal__close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </Button>
        {children}
      </div>
    </div>, document.body)
}

export default Modal;