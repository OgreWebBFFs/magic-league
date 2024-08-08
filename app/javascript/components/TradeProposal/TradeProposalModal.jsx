import React from 'react';
import Modal from '../Modal';


const TradeProposalRequest = ({ user, card }) => (
  <>
    <p>You are contacting:</p>
        {user.name}
    <p>
      To talk about trading for
      <span className="card-to-be-traded">{card.name}</span>
    </p>
    <form action="/trade_message" method="post">
      <input type="hidden" name="authenticity_token" value={document.querySelector('meta[name="csrf-token"]').content} />
      <input type="hidden" name="card_id" value={card.id} />
      <input type="hidden" name="to_user_id" value={2} />
      <input type="hidden" name="from_user_id" value={1} />
      <button type="submit" className="trade-modal_send__button button">Send Message</button>
    </form>
  </>
);

const TradeProposalModal = ({ onClose, card, currentUserId, user }) => (
    <Modal onClose={onClose}>
        <TradeProposalRequest user={user} card={card} />
    </Modal>
);

export default TradeProposalModal;
