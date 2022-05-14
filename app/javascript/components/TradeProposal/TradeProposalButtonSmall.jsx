import React, { useState } from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';

const TradeProposalButtonSmall = ({ card, currentUserId }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button className="trade-proposal-btn--small" onClick={() => setModalOn(true)}>
        <i className="fa fa-envelope" aria-hidden="true" />
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
