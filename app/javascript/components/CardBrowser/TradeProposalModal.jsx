import React from 'react';

const OnlyYouOwnMsg = () => (
  <>
    <h4 className="modal__title">Oh no!</h4>
    <p>You are the only user who owns this card. 😭</p>
  </>
);

const TradeProposalRequest = ({ users, card }) => (
  <>
    <p>You are contacting:</p>
    {users.map(user => (
      <ul className="trade-modal_partner-list">
        {user.attributes.name}
      </ul>
    ))}
    <p>To talk about trading for <span className="card-to-be-traded">{card.attributes.name}</span></p>
    <form action="/trades" method="post"> 
      <input type="hidden" name="authenticity_token" value={document.querySelector('meta[name="csrf-token"]').content}/>
      <input type="hidden" name="trade[card_id]" value={card.id}/>
      <button type="submit" className="trade-modal_send__btn">Send Message</button>
    </form>
  </>
)

const TradeProposalModal = ({ closeModal, card, currentUserId }) => {
  const otherUsersWithCard =  card.attributes.users.data.filter(user => user.attributes.id !== currentUserId);
  return (
    <div id="trade-modal" className="modal active"  >
      <div className="modal__overlay overlay" onClick={closeModal}></div>
      <div className="modal__content">
        <button className="modal__close-button" href="#" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
        {otherUsersWithCard.length > 0 ?
          <TradeProposalRequest users={otherUsersWithCard} card={card} />
          : <OnlyYouOwnMsg />}
      </div>
    </div>
  )
}

export default TradeProposalModal;