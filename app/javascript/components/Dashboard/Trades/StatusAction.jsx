import React from 'react';
import Button from '../../Button';
import TradeReviewButton from './TradeReviewButton';

const PendingAction = ({ trade, currentUserId }) => (
  trade.to.id === currentUserId ? <TradeReviewButton trade={trade} /> : <p>Awaiting Review...</p>
)

const StatusAction = ({ trade, currentUserId }) => (
  trade.status === 'pending' ? <PendingAction trade={trade} currentUserId={currentUserId} /> : <p>{trade.status}</p>
)

export default StatusAction;