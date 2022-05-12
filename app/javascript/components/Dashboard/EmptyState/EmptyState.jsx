import React from 'react';

const EmptyState = ({isOwner, user: {id, name}, CtaComponent}) => {
  const youNoCards = "Hey, LISTEN! It look's like you haven't added any cards here yet.";
  const theyNoCards = `Drat! It look's like ${name} hasn't added any cards here yet.`
  return (
    <div class="empty-card-view">
      <p class="empty-card-view__message">
        {isOwner ? youNoCards : theyNoCards}
      </p>
      {isOwner && <CtaComponent />}
    </div>
  );
};

export default EmptyState;
