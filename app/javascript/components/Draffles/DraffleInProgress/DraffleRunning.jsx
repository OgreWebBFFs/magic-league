import React, { useState } from 'react';
import Button from '../../Button';
import { Table, Row, Cell } from '../../Table';
import xhrRequest from '../../../helpers/xhr-request';
import LoadingTakeOver from '../LoadingTakeOver';
import PrizeNameImageToggle from './PrizeNameImageToggle';

const pauseDraffle = async (draffle) => xhrRequest({
  url: `/draffles/${draffle.id}/pause`,
  options: {
    method: 'PUT',
  },
});

const getPickTime = ({ updated_at: time }) => {
  const jsTime = new Date(time);
  return `${jsTime.toLocaleDateString()} at ${jsTime.toLocaleTimeString()}` 
}

const DraffleRunning = ({ draftBoard: { rounds }, draffle }) => {
  const [loading, setLoading] = useState(false);
  const currentPick = rounds.flat().find((slot) => slot.prize === null);

  return (
    <>
      <Button onClick={async () => {
          setLoading(true);
          await pauseDraffle(draffle);
          window.location.reload();
      }}
      >
        <i className="fa"/>
          PAUSE
      </Button>
      {rounds.map((round, i) => (
        <>
          <h3>{`Round ${i + 1}`}</h3>
          <Table className="draft-board">
            <Row isHeading>
              <Cell className="pick-column">Pick</Cell>
              <Cell className="name-column">Player</Cell>
              <Cell className="prize-column">Prize</Cell>
              <Cell className="time-column">Pick Date/Time</Cell>
            </Row>
            {round.map((slot, j) => (
              <Row className={slot === currentPick ? 'current-pick' : ''}>
                <Cell className="pick-column">
                  {j + rounds[0].length * i + 1}
                </Cell>
                <Cell className="name-column">{slot.user.name}</Cell>
                <Cell className="prize-column">
                  {slot.prize && <PrizeNameImageToggle prize={slot.prize}/>}
                </Cell>
                <Cell className="time-column">{slot.prize && getPickTime(slot.prize)}</Cell>
              </Row>
            ))}
          </Table>
          {loading && <LoadingTakeOver />}
        </>
      ))}
    </>
  );
};

export default DraffleRunning;
