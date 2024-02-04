import React from 'react';
import Button from '../../../Button';

const EmptyState = ({ isOwner, user: { name, id }}) => {
  const youNoCards = "Hey, LISTEN! It look's like you haven't added any cards here yet.";
  const theyNoCards = `Drat! It look's like ${name} hasn't added any cards here yet.`;
  return (
    <div className="empty-card-view">
      <p className="empty-card-view__message">
        {isOwner ? youNoCards : theyNoCards}
      </p>
      {isOwner &&   
      <Button className="empty-card-view__button button--small" href="/browse">
        Make some wishes
      </Button>}
    </div>
  );
};

export default EmptyState;
