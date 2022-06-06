import React from 'react';
import xhrRequest from '../../../../../helpers/xhr-request';
import Button from '../../../../Button';

const setupRerolls = async (userId) => xhrRequest({
  url: '/rerolls',
  options: {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  },
});

const assignObjectives = async (userId) => xhrRequest({
  url: '/user_objectives',
  options: {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  },
});

const setupObjectives = async (userId) => {
  await Promise.all([
    setupRerolls(userId),
    assignObjectives(userId),
  ]);
  window.location.reload();
};

const EmptyObjectives = ({ currentUserId }) => (
  <>
    <p className="dashboard__active-objectives--empty-msg">No quests have been assigned to you yet</p>
    <Button className="dashboard__active-objectives--empty-btn" onClick={() => setupObjectives(currentUserId)}>Begin Questing!</Button>
  </>
);

export default EmptyObjectives;
