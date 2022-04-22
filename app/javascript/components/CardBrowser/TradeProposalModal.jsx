import React from 'react';

const TradeProposalModal = ({ closeModal }) => {
  return (
    <div id="trade-modal" className="modal active"  >
      <div className="modal__overlay overlay" onClick={closeModal}></div>
      <div className="modal__content">
        <button className="modal__close-button" href="#" onClick={closeModal}>
        <i className="fas fa-times"></i>
        </button>
        <h4 className="modal__title">Oh no!</h4>
        <p>You are the only user who owns this card. 😭</p>
      </div>
    </div>
  )
}

export default TradeProposalModal;