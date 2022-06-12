import React from 'react';
import xhrRequest from '../../../helpers/xhr-request';
import Button from '../../Button';

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

const EmptyObjectives = ({ currentUserId, user }) => (
  user.id === currentUserId ? (
    <p className="dashboard__objectives--empty-msg">
      No quests have been assigned to you yet
      <br />
      <Button className="dashboard__objectives--empty-btn" onClick={() => setupObjectives(currentUserId)}>Begin Questing!</Button>
    </p>
  ) : (
    <p className="dashboard__objectives--empty-msg">{`${user.name} has yet to prevail in their conquests`}</p>
  )
);

export default EmptyObjectives;
