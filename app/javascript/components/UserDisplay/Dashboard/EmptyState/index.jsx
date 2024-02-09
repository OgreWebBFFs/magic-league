import React from "react";

const EmptyState = ({ isOwner, name = "", ActionButton, message }) => {
    const youNoCards = "Hey, LISTEN! It looks like you haven't added any cards here yet.";
    const theyNoCards = `Drat! It looks like ${name} hasn't added any cards here yet.`;
    const defaultMessage = isOwner ? youNoCards : theyNoCards;
    return (
        <div className="empty-card-view">
            <p className="empty-card-view__message">{message || defaultMessage}</p>
            {isOwner && ActionButton}
        </div>
    );
};

export default EmptyState;
