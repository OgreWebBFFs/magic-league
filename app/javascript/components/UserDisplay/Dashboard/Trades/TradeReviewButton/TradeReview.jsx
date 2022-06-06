import React from 'react';
import Button from '../../../../Button';
import postTradeReview from './post-trade-review';
import CardReviewTable from './CardReviewTable';

const TradeReview = ({ trade }) => (
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
    <div className="trade-review-modal__actions">
      <Button onClick={() => postTradeReview(trade, 'approved')} className="trade-review-modal__action-button approve">Accept</Button>
      <Button onClick={() => postTradeReview(trade, 'rejected')} className="trade-review-modal__action-button reject">Decline</Button>
    </div>
    <p className="trade-review-modal__warning">
      <span className="warning">**WARNING**</span>
      : Selecting Accept will automatically update your allottedtrades and collection!
      Choose wisely...
    </p>
  </>
);

export default TradeReview;
