import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import classNames from 'classnames';
import Toggle from '../../../Toggle';
import Button from '../../../Button';
import {
  nonParticipantUsers,
  addParticipant,
  removeParticipant,
} from './participant-user-utils';
import ParticipantPicker from './ParticipantPicker';
import ParticipantOrderer from './ParticipantOrderer';
import Divider from './Divider';
import randomizeOrder from './randomize-order';

const EditParticipants = ({
  participants,
  users,
  onChange,
}) => {
  const { width: screenSize } = useWindowSize();
  const [viewIn, setViewIn] = useState(false);
  const [newParticipants, setNewParticipants] = useState(participants.map((p) => p.user || p));
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    onChange(isRandom ? randomizeOrder(newParticipants) : newParticipants)
  }, [newParticipants, isRandom])

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
        <div className={classNames("edit-participants__dashboard", { "view-in": viewIn })} style={{ minHeight: `${users.length * 3.5}rem` }}>
          <div className="edit-participants__picker">
            {screenSize <= 500 && <Button className="button--secondary" onClick={() => setViewIn(true)}>View In ▶</Button>}
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
            {screenSize <= 500 && <Button className="button--secondary" onClick={() => setViewIn(false)}>◀ View Out</Button>}
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
