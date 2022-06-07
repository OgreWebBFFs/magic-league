import React from 'react';

const EmptyState = ({ isOwner, user: { name, id }, CtaComponent }) => {
  const youNoCards = "Hey, LISTEN! It look's like you haven't added any cards here yet.";
  const theyNoCards = `Drat! It look's like ${name} hasn't added any cards here yet.`;
  return (
    <div className="empty-card-view">
      <p className="empty-card-view__message">
        {isOwner ? youNoCards : theyNoCards}
      </p>
      {isOwner && <CtaComponent userId={id} />}
    </div>
  );
};

export default EmptyState;
