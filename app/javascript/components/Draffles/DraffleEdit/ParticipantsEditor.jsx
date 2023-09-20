import React, { useState } from 'react';
import Modal from '../../Modal';

const ParticipantsEditor = ({ users, participants, onClose }) => {
  const [newParticipants, setNewParticipants] = useState([...participants]);

  return (
    <Modal onClose={() => onClose(newParticipants)}>
      Add Draffle Partipants
      <div style={{display: 'flex' }}>
        <div>
          {users
            .filter(
              (user) => !newParticipants.some(
                (participant) => participant.id === user.id,
              ),
            ).map(
              (user) => (
                <button
                  type="button"
                  style={{ display: 'block' }}
                  onClick={() => setNewParticipants(newParticipants.concat(user))}
                >
                  {user.name}
                </button>
              ),
            )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <i className="fas fa-arrow-right" style={{ color: 'green' }} />
          <i className="fas fa-arrow-left" style={{ color: 'red' }} />
        </div>
        <div>
          {newParticipants.map((participant) => (
            <button
              type="button"
              style={{ display: 'block' }}
              onClick={
                () => setNewParticipants(
                  newParticipants.filter((toRemove) => toRemove.id !== participant.id),
                )
              }
            >
              {participant.name}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ParticipantsEditor;
