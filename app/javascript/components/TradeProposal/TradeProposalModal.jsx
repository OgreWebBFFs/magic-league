import React from 'react';
import Modal from '../Modal';

const OnlyYouOwnMsg = () => (
  <>
    <h4 className="modal__title">Oh no!</h4>
    <p>You are the only user who owns this card. 😭</p>
  </>
);

const TradeProposalRequest = ({ users, card }) => (
  <>
    <p>You are contacting:</p>
    {users.map((user) => (
      <ul className="trade-modal_partner-list">
        {user.attributes.name}
      </ul>
    ))}
    <p>
      To talk about trading for
      <span className="card-to-be-traded">{card.attributes.name}</span>
    </p>
    <form action="/trade_mail" method="post">
      <input type="hidden" name="authenticity_token" value={document.querySelector('meta[name="csrf-token"]').content} />
      <input type="hidden" name="trade[card_id]" value={card.id} />
      { users.length === 1 && 
        <input type="hidden" name="trade[user_id]" value={users[0].attributes.id} />
      }
      <button type="submit" className="trade-modal_send__button button">Send Message</button>
    </form>
  </>
);

const TradeProposalModal = ({ onClose, card, currentUserId }) => {
  const otherUsersWithCard = card.attributes.users.data.filter((user) => (
    user.attributes.id !== currentUserId
  ));
  return (
    <Modal onClose={onClose}>
      {otherUsersWithCard.length > 0
        ? <TradeProposalRequest users={otherUsersWithCard} card={card} />
        : <OnlyYouOwnMsg />}
    </Modal>
  );
};

export default TradeProposalModal;
