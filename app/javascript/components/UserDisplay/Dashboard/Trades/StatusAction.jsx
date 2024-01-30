import React from 'react';
import TradeReviewButton from './TradeReviewButton';

const StatusIcons = {
  approved: () => <i className="fas fa-check approved" />,
  rejected: () => <i className="fas fa-times rejected" />,
  error: () => <i className="fas fa-exclamation-triangle error" />,
  pending: ({ trade, currentUserId }) => (
    trade.to.id === currentUserId
      ? <TradeReviewButton trade={trade} /> : <i className="fas fa-question waiting" />
  ),
};

const StatusAction = (props) => (
  StatusIcons[props.trade.status](props)
);

export default StatusAction;
