import React from 'react';
import DraffleRunning from './DraffleRunning';

const DraffleInProgress = ({ draft_board: draftBoard, draffle }) => (
  <>
    <h1>{draffle.name}</h1>
    <DraffleRunning draftBoard={draftBoard} draffle={draffle} />
  </>
);

export default DraffleInProgress;
