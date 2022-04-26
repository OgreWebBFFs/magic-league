import React from 'react';
import Button from '../Button';
import classNames from 'classnames'

const TradeProposalButton = ({ isAvailable, onClick }) => {
  return (
    <div class="card-grid__trade-proposal">
      <Button
        type="button"
        disabled={!isAvailable}
        className={classNames("card-grid__trade-proposal-button", {"button--inverse": !isAvailable})}
        onClick={onClick}>
          {isAvailable ? "Propose Trade" : "Not in League"}
      </Button>
    </div>
  );
}

export default TradeProposalButton;