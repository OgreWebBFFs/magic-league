import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import LoadingTakeOver from '../LoadingTakeOver';
import EditDetails from './EditDetails';
import EditParticipants from './EditParticipants';
import EditPrizes from './EditPrizes';
import updateDraffle from './update-draffle';
import startDraffle from './start-draffle';
import {
  checkDetailsChanges,
  checkParticipantChanges,
  checkPrizeChanges
} from './check-changes';

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
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const detailsChanged = checkDetailsChanges(draffle, newDraffle);
    const participantsChanged = checkParticipantChanges(participants, newParticipants);
    const prizesChanged = checkPrizeChanges(prizes, newPrizes);
    setChanged(detailsChanged || participantsChanged || prizesChanged);
  }, [newDraffle, newParticipants, newPrizes]);

  return (
    <div className="draffle-edit">
      <div className="draffle-edit__header">
        <h1>Draffle Creation Portal</h1>
        <div className="draffle-edit__header--actions">
          <Button
            disabled={newDraffle.welcome.length > 2000}
            onClick={async () => {
              setLoading(true);
              await updateDraffle(draffle, newParticipants, newPrizes, newDraffle);
              window.location.reload();
            }}
          >
            <i className="fas fa-save" style={{ marginRight: "0.5rem" }}/>
            SAVE<br />CHANGES
          </Button>
          <Button 
            disabled={changed || draffle.status !== 'valid'}
            onClick={async () => {
              setLoading(true);
              await startDraffle(draffle);
              window.location.reload();
            }}
          >
            <i className="fas fa-play" style={{ marginRight: "0.5rem" }}/>
            START<br />DRAFFLE
          </Button>
        </div>
        {changed && (
          <div className="draffle-edit__header--alert">
            You have unsaved changes to the draffle. Please save those changes or refresh to revert them before starting.
          </div>
        )}
        {!changed && draffle.status !== 'valid' && (
          <div className="draffle-edit__header--alert">
            Your Draffle is in an invalid state. Check there are enough prizes for each participant to pick one in each round.
          </div>
        )}
        {newDraffle.welcome.length > 2000 && (
          <div className="draffle-edit__header--alert">
            Your Welcome message cannot be longer than 2000 characters. Please shorten it before uploading.
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
