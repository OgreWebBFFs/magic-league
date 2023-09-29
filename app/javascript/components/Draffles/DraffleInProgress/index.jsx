import React, { useState } from 'react';
import Button from '../../Button';
import { Table, Row, Cell } from '../../Table';

const DraffleInProgress = ({ draft_board: { rounds }, draffle }) => {
  const [shownRound, setShownRound] = useState(0);
  const currentPick = rounds.flat().find((slot) => slot.prize === null);

  return (
    <>
      <h2>{draffle.name}</h2>
      <Button>
        <i className="fas fa-pause" />
        PAUSE
      </Button>
      <div style={{display: 'flex'}}>

        <Button onClick={() => shownRound > 0 && setShownRound(shownRound - 1)}>
          <i className="fas fa-minus" />
        </Button>
        <h3>{`Round ${shownRound + 1}`}</h3>
        <Button onClick={() => shownRound < rounds.length - 1 && setShownRound(shownRound + 1)}>
          <i className="fas fa-plus" />
        </Button>
      </div>
      <Table>
        <Row isHeading>
          <Cell>Pick</Cell>
          <Cell>Player</Cell>
          <Cell>Prize</Cell>
        </Row>
        {rounds[shownRound].map((slot, i) => (
          <Row className={slot === currentPick ? 'current-pick' : ''}>
            <Cell>{i + rounds[0].length * shownRound + 1}</Cell>
            <Cell>{slot.user.name}</Cell>
            <Cell>{slot.prize?.name}</Cell>
          </Row>
        ))}
      </Table>
    </>
  );
};

export default DraffleInProgress;
