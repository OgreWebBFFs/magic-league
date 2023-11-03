import React from 'react';
import DraffleRunning from './DraffleRunning';
import DrafflePaused from './DrafflePaused';

const DraffleInProgress = ({ draft_board: draftBoard, draffle, prizes }) => (
  <>
    <h1>{draffle.name}</h1>
    {draffle.status === 'started' && (
      <DraffleRunning 
        draftBoard={draftBoard}
        draffle={draffle}
        availablePrizes={prizes.filter(prize => prize.draffle_participant_id === null)}
      />
    )}
    {(draffle.status === 'paused' || draffle.status === 'pending') && (
     <DrafflePaused draftBoard={draftBoard} draffle={draffle} />
    )}
  </>
);

export default DraffleInProgress;
