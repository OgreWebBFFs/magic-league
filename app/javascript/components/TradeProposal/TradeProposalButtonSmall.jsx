import React, { useState } from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';

const TradeProposalButtonSmall = ({ card, currentUserId, unavailable }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button className="button--small" onClick={() => setModalOn(true)} style={{ flexDirection: 'column' }} disabled={unavailable}>
        <span style={{ display: 'grid', placeItems: 'center' }}>
            {unavailable ? (
                <span style={{ display: 'grid', placeItems: 'center' }}>
                    <i className='fas fa-slash' style={{ fontSize: '1.3rem' }} />
                    <i className='fas fa-exchange-alt' style={{ position: 'absolute', fontSize: '1.3rem' }}/>
                </span>
            ) : (
                <>
                    <i className="fas fa-comment" aria-hidden="true" style={{ fontSize: '1.6rem' }} />
                    <i className="fas fa-exchange-alt hollow-text" style={{ position: 'absolute' }} />
                </>
            )}
        </span>
        {unavailable ? 'Not Trading' : 'Request'}
      </Button>
      {modalOn && (
      <TradeProposalModal
        card={card}
        currentUserId={currentUserId}
        onClose={() => setModalOn(false)}
      />
      )}
    </>
  );
};

export default TradeProposalButtonSmall;
