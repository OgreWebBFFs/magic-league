import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import LoadingTakeOver from '../LoadingTakeOver';
import EditDetails from './EditDetails';
import EditParticipants from './EditParticipants';
import EditPrizes from './EditPrizes';
import updateDraffle from './update-draffle';

const DraffleEdit = ({
  draffle,
  participants,
  users,
  prizes,
}) => {
  const [newDraffle, setNewDraffle] = useState(draffle);
  const [newParticipants, setNewParticipants] = useState(participants);
  const [newPrizes, setNewPrizes] = useState(prizes);
  const [loading, setLoading] = useState(false);

  return (
    <div className="draffle-edit">
      <div className="draffle-edit__header">
        <h1>Draffle Creation Portal</h1>
        <div className="draffle-edit__header--actions">
          <Button onClick={async () => {
            setLoading(true);
            await updateDraffle(draffle.id, newParticipants, newPrizes, newDraffle);
            window.location.reload();
          }}>
            <i className="fas fa-upload" style={{ marginRight: "0.5rem" }}/>
            UPLOAD<br />CHANGES
          </Button>
          <Button 
            disabled={draffle.status !== 'valid'}
            onClick={async () => {
              setLoading(true);
              await startDraffle(draffle.id, newParticipants, newPrizes, newDraffle);
              window.location.reload();
            }}
          >
            <i className="fas fa-play" style={{ marginRight: "0.5rem" }}/>
            START<br />DRAFFLE
          </Button>
        </div>
        {draffle.status !== 'valid' && (
          <div className="draffle-edit__header--alert">
            Your Draffle is in an invalid state. Check there are enough prizes for each participant to pick.
          </div>
        )}
      </div>
      <EditDetails draffle={newDraffle} onChange={(val) => setNewDraffle(val)}/>
      <EditParticipants
        participants={newParticipants}
        users={users}
        onChange={(participants) => setNewParticipants(participants)}
      />
      <EditPrizes prizes={newPrizes} onChange={(prizes) => setNewPrizes(prizes)}/>
      {loading && <LoadingTakeOver />}
    </div>
  );
};

export default DraffleEdit;
