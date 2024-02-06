import React, { useState } from 'react';
import Button from '../../../../Button';
import postTradeReview from './post-trade-review';
import CardReviewTable from './CardReviewTable';

const TradeReview = ({ trade }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <h3>Reviewing Trade</h3>
      <p>
        <span style={{ fontWeight: '900' }}>{trade.from.name}</span>
        {' '}
        has proposed the following trade:
      </p>
      <div className="trade-review-modal__contents">
        <CardReviewTable
          cards={trade.from.cards}
          header="You Receive"
          arrow={<i className="fas fa-arrow-left" />}
        />
        <CardReviewTable
          cards={trade.to.cards}
          header={`${trade.from.name} Receives`}
          arrow={<i className="fas fa-arrow-right" />}
        />
      </div>
      <div className="modal__actions">
        <Button onClick={() => { setIsSubmitting(true); postTradeReview(trade, 'rejected')}} className="modal__action-button button--negative" disabled={isSubmitting}>Decline</Button>
        <Button onClick={() => { setIsSubmitting(true); postTradeReview(trade, 'approved')}} className="modal__action-button button--positive" disabled={isSubmitting}>Accept</Button>
      </div>
      <p className="modal__notice">
        <span className="warning">**WARNING**</span>
        : Selecting Accept will automatically update your allottedtrades and collection!
        Choose wisely...
      </p>
    </>
  );
}

export default TradeReview;
