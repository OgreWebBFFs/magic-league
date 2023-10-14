import React, { useState } from 'react';
import Toggle from '../../../Toggle';
import {
  nonParticipantUsers,
  addParticipant,
  removeParticipant,
} from './participant-user-utils';
import ParticipantPicker from './ParticipantPicker';
import ParticipantOrderer from './ParticipantOrderer';
import Divider from './Divider';

const EditParticipants = ({
  participants,
  users,
}) => {
  const [newParticipants, setNewParticipants] = useState(participants.map((p) => p.user || p));
  const [isRandom, setIsRandom] = useState(false);

  return (
    <>
      <h2>Participants</h2>
      <div className="edit-participants">
        <div className="form__field">
          <label className="with-sub-msg" htmlFor="random-toggle" style={{ height: '3rem' }}>
            Randomize Order?
            <span className="sub-msg">Order will be randomized on save</span>
          </label>
          <Toggle
            name="random-toggle"
            checked={isRandom}
            onClick={() => setIsRandom(!isRandom)}
            options={['Yes', 'No']}
          />
        </div>
        <div className="edit-participants__dashboard" style={{ minHeight: `${users.length * 3.5}rem` }}>
          <div className="edit-participants__picker">
            {nonParticipantUsers(users, newParticipants).map(
              (user) => (
                <ParticipantPicker
                  user={user}
                  onClick={() => setNewParticipants(addParticipant(user, newParticipants))}
                />
              ),
            )}
          </div>
          <Divider />
          <div className="edit-participants__picker">
            {newParticipants.map((participant) => (
              <div style={{ display: 'flex' }}>
                <ParticipantPicker
                  user={participant}
                  onClick={() => setNewParticipants(
                    removeParticipant(participant, newParticipants),
                  )}
                  orderable={!isRandom}
                />
                {!isRandom && (
                  <ParticipantOrderer
                    participant={participant}
                    participants={newParticipants}
                    onOrder={(newArr) => setNewParticipants(newArr)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditParticipants;
