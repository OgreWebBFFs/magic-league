import React, {useState} from 'react';
import Button from '../Button';
import classNames from 'classnames'
import TradeProposalModal from './TradeProposalModal';

const TradeProposalButtonLarge = ({ isAvailable, card, currentUserId }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button
        type="button"
        disabled={!isAvailable}
        style={{width: "100%", margin: "10px 0"}}
        className={classNames({"button--inverse": !isAvailable})}
        onClick={() => setModalOn(true)}>
          {isAvailable ? "Propose Trade" : "Not in League"}
      </Button>
      {modalOn && <TradeProposalModal
        card={card}
        currentUserId={currentUserId}
        onClose={() => setModalOn(false)}
      />}
    </>
  );
}

export default TradeProposalButtonLarge;