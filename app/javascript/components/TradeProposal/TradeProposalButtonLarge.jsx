import React, {useState} from 'react';
import Button from '../Button';
import classNames from 'classnames'
import TradeProposalModal from './TradeProposalModal';

const ProposeTrade = () => (
  <>
    <i class="fa fa-envelope" aria-hidden="true"></i>
    Propose Trade
  </>
)

const TradeProposalButtonLarge = ({ isAvailable, card, currentUserId }) => {
  const [modalOn, setModalOn] = useState(false);
  return (
    <>
      <Button
        type="button"
        disabled={!isAvailable}
        className={classNames("trade-proposal-button", {"button--inverse": !isAvailable})}
        onClick={() => setModalOn(true)}>
          {isAvailable ? <ProposeTrade /> : "Not in League"}
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