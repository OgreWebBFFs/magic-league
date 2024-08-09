import React, { useState } from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';

const TradeProposalButton = ({ card, currentUserId, unavailable, large, user }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button className="button--small" onClick={() => setModalOn(true)} style={{ flexDirection: 'column' }} disabled={unavailable}>
        <span style={{ position: 'relative' }}>
            {unavailable ? (
                <>
                    <i className='fas fa-slash' style={{ fontSize: '1.3rem' }} />
                    <i className='fas fa-exchange-alt' style={{ position: 'absolute', fontSize: '1.3rem', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
                </>
            ) : (
                <>
                    <i className="fas fa-comment" aria-hidden="true" style={{ fontSize: '1.6rem' }} />
                    <i className="fas fa-exchange-alt hollow-text" style={{ fontSize: ".9rem", position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
                </>
            )}
        </span>
        {large && (unavailable ? 'Not Trading' : 'Message')}
      </Button>
      {modalOn && (
        <TradeProposalModal
            card={card}
            currentUserId={currentUserId}
            user={user}
            onClose={() => setModalOn(false)}
        />
      )}
    </>
  );
};

export default TradeProposalButton;
