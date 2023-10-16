import React, { useState } from 'react';
import Button from '../../../Button';
import { Table, Row, Cell } from '../../../Table';
import xhrRequest from '../../../../helpers/xhr-request';
import LoadingTakeOver from '../../LoadingTakeOver';
import PrizeNameImageToggle from '../DraffleRunning/PrizeNameImageToggle';

const validateDraffle = async (draffle) => xhrRequest({
  url: `/draffles/${draffle.id}/complete`,
  options: {
    method: 'PUT'
  }
});

const startDraffle = async (draffle) => xhrRequest({
  url: `/draffles/${draffle.id}/start`,
  options: {
    method: 'PUT'
  }
});

const resetDraffle = async (draffle, pick) => xhrRequest({
  url: `/draffles/${draffle.id}/reset`,
  options: {
    method: 'PUT',
    body: JSON.stringify(pick ? { pick } : { })
  },
});

const getPickTime = ({ updated_at: time }) => {
  const jsTime = new Date(time);
  return `${jsTime.toLocaleDateString()} at ${jsTime.toLocaleTimeString()}` 
}

const DrafflePaused = ({ draftBoard: { rounds }, draffle }) => {
  const [loading, setLoading] = useState(false);
  const currentPick = rounds.flat().find((slot) => slot.prize === null);

  const reloadOnFinish = async (f, ...params) => {
    setLoading(true);
    await f(...params);
    window.location.reload();
  }

  return (
    <>
      <Button onClick={() => reloadOnFinish(draffle.status === 'pending' ? validateDraffle : startDraffle, draffle)}>
          {draffle.status === 'pending' ? 'VALIDATE' : 'START'}
      </Button>
      
      {rounds.map((round, i) => (
        <>
          <h3>{`Round ${i + 1}`}</h3>
          <Table className="draft-board">
            <Row isHeading>
              <Cell className="pick-column">Pick</Cell>
              <Cell className="name-column">
                Player
                {i ===  0 && (
                  <Button onClick={async () => reloadOnFinish(resetDraffle, draffle)}>
                    <i className="fa"/>
                      REWIND ALL
                  </Button>
                )}
              </Cell>
              <Cell className="prize-column">Prize</Cell>
              <Cell className="time-column">Pick Date/Time</Cell>
            </Row>
            {round.map((slot, j) => (
              <Row className={slot === currentPick ? 'current-pick' : ''}>
                <Cell className="pick-column">
                  {j + rounds[0].length * i + 1}
                </Cell>
                <Cell className="name-column">
                  <span>{slot.user.name}</span>
                  {slot.prize && (
                    <Button
                      onClick={() => reloadOnFinish(resetDraffle, draffle, j + rounds[0].length * i + 1)}
                    >
                      REWIND TO
                    </Button>
                  )}
                </Cell>
                <Cell className="prize-column">
                  {slot.prize && <PrizeNameImageToggle prize={slot.prize}/>}
                </Cell>
                <Cell className="time-column">{slot.prize && getPickTime(slot.prize)}</Cell>
              </Row>
            ))}
          </Table>
        </>
      ))}
      {loading && <LoadingTakeOver />}
    </>
  );
};

export default DrafflePaused;
