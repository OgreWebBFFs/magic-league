import React from "react";
import TradeReviewButton from "./TradeReviewButton";

const StatusIcons = {
    approved: () => <i className="fas fa-check approved" />,
    rejected: () => <i className="fas fa-times rejected" />,
    error: () => <i className="fas fa-exclamation-triangle error" />,
    pending: ({ trade, currentUserId }) =>
        trade.status.split("|").includes(`${currentUserId}`) ? (
            <i className="fas fa-question waiting" />
        ) : (
            <TradeReviewButton trade={trade} />
        ),
};

const StatusAction = (props) => (StatusIcons[props.trade.status] || StatusIcons.pending)(props);

export default StatusAction;
