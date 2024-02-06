import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';

const Modal = ({ onClose, children }) => createPortal((
  <div className="modal active">
    <div className="modal__overlay overlay" onClick={onClose} role="none" />
    <div className="modal__area">
      <Button className="modal__close-button button--small button--ghost" onClick={onClose}>
        <i className="fas fa-times" />
      </Button>
      <div className="modal__content">
        {children}
      </div>
    </div>
  </div>), document.body);

export default Modal;
