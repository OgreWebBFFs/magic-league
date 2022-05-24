import React from 'react';

const CallToAction = ({ user }) => (
  <a className="empty-card-view__btn" href={`/collections/${user.id}/edit`}>
    Build Your Collection
  </a>
);

export default CallToAction;
