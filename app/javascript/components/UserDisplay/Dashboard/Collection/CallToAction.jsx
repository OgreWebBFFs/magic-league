import React from 'react';

const CallToAction = ({ userId }) => (
  <a className="empty-card-view__btn" href={`/collections/${userId}/edit`}>
    Build Your Collection
  </a>
);

export default CallToAction;
