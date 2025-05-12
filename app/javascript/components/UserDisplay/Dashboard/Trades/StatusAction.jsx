import React from "react";
import TradeReviewButton from "./TradeReviewButton";

const PendingTradeOption = ({ trade, currentUserId }) =>
    trade.status.split("|").includes(`${currentUserId}`) ? (
        <i className="fas fa-question waiting" />
    ) : (
        <TradeReviewButton trade={trade} currentUserId={currentUserId} />
    );

const StatusIcons = {
    approved: <i className="fas fa-check approved" />,
    rejected: <i className="fas fa-times rejected" />,
    error: <i className="fas fa-exclamation-triangle error" />,
};

const StatusAction = (props) => StatusIcons[props.trade.status] || <PendingTradeOption {...props} />;

export default StatusAction;
