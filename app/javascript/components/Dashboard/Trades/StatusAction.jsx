import React from 'react';
import Button from '../../Button';
import TradeReviewButton from './TradeReviewButton';

const StatusIcons = {
  approved: () => <i className="fas fa-check approved"></i>,
  rejected: () => <i className="fas fa-times rejected"></i>
}

const PendingAction = ({ trade, currentUserId }) => (
  trade.to.id === currentUserId ? <TradeReviewButton trade={trade} /> : <i className="fas fa-question waiting"></i>
)

const StatusAction = ({ trade, currentUserId }) => (
  trade.status === 'pending' ? 
    <PendingAction trade={trade} currentUserId={currentUserId} />
    : <p>{StatusIcons[trade.status]()}</p>
)

export default StatusAction;