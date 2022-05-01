import React, {useState} from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';

const TradeProposalButtonSmall = ({ card, currentUserId }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button style={{margin: 0}} onClick={() => setModalOn(true)}>
        <i class="fa fa-envelope" aria-hidden="true" ></i>
      </Button>
      {modalOn && <TradeProposalModal
          card={card}
          currentUserId={currentUserId}
          onClose={() => setModalOn(false)}
        />}
    </>
  )
};

export default TradeProposalButtonSmall;