import React from 'react';
import Modal from '../Modal';

const TradeProposalModal = ({ onClose, card, currentUserId, user, priorMessageTimestamp }) => (
    <Modal onClose={onClose}>
        <div style={{ marginBottom: '1rem' }}>
            <p>You are contacting:</p>
            {user.name}
            <p>To talk about trading for</p>
            {card.name}
            {priorMessageTimestamp && (
                <>
                    <p>You previously messaged them about this card on:</p>
                    {(new Date(priorMessageTimestamp).toLocaleDateString('en-US', {  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }))}
                </>
            )}
        </div>
        <form action="/trade_message" method="post">
        <input type="hidden" name="authenticity_token" value={document.querySelector('meta[name="csrf-token"]').content} />
        <input type="hidden" name="card_id" value={card.id} />
        <input type="hidden" name="to_user_id" value={user.id} />
        <input type="hidden" name="from_user_id" value={currentUserId} />
        <button type="submit" className="button"><i className="fab fa-discord" /> Send Message</button>
        </form>
    </Modal>
);

export default TradeProposalModal;
