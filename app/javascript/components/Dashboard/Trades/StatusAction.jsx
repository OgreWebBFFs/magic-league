import React from 'react';
import TradeReviewButton from './TradeReviewButton';

const StatusIcons = {
  approved: () => <i className="fas fa-check approved"></i>,
  rejected: () => <i className="fas fa-times rejected"></i>,
  pending: ({ trade, currentUserId }) => (
    trade.to.id === currentUserId ? 
      <TradeReviewButton trade={trade} /> : <i className="fas fa-question waiting"></i>
  ),
}

const StatusAction = (props) => (
  StatusIcons[props.trade.status](props)
)

export default StatusAction;