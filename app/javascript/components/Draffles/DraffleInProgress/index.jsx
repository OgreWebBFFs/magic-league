import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../../Button';
import { Table, Row, Cell } from '../../Table';
import xhrRequest from '../../../helpers/xhr-request';

const pauseDraffle = async (draffle) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/pause`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const restartDraffle = async (draffle) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/start`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const completeDraffle = async (draffle) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/complete`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const resetDraffle = async (draffle, pick) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/reset`,
    options: {
      method: 'PUT',
      body: JSON.stringify({
        pick,
      }),
    },
  });
  window.location.reload();
};

const DraffleInProgress = ({ draft_board: { rounds }, draffle }) => {
  const [status, setStatus] = useState(draffle.status);
  const currentPick = rounds.flat().find((slot) => slot.prize === null);

  return (
    <>
      <h2>{draffle.name}</h2>
      <Button onClick={() => {
        if (status === 'started') {
          setStatus('pausing');
          pauseDraffle(draffle);
        } else if (status === 'paused') {
          setStatus('starting');
          restartDraffle(draffle);
        } else {
          setStatus('validating');
          completeDraffle(draffle);
        }
      }}
      >
        <i className={classNames('fa', {
          'fa-pause': status === 'started',
          'fa-spinner': status === 'pausing' || status === 'starting' || status === 'validating',
          'fa-play': status === 'paused',
          'fa-thumbs-up': status === 'pending',
        })}
        />
        {status === 'started' ? 'PAUSE' : ''}
        {status === 'pausing' ? 'PAUSING' : ''}
        {status === 'paused' ? 'START' : ''}
        {status === 'starting' ? 'STARTING' : ''}
        {status === 'pending' ? 'VALIDATE' : ''}
      </Button>
      {(status === 'paused' || status === 'pending') && (
        <Button onClick={() => resetDraffle(draffle, 0)}>
          <i className="fas fa-undo" />
          RESET ALL
        </Button>
      )}
      {rounds.map((round, i) => (
        <>
          <h3>{`Round ${i + 1}`}</h3>
          <Table>
            <Row isHeading>
              <Cell>Pick</Cell>
              <Cell>Player</Cell>
              <Cell>Prize</Cell>
            </Row>
            {round.map((slot, j) => (
              <Row className={slot === currentPick ? 'current-pick' : ''}>
                <Cell>
                  {(status === 'paused' || status === 'pending') && slot.prize && (
                    <Button onClick={() => resetDraffle(draffle, j + rounds[0].length * i + 1)}>
                      <i className="fas fa-undo" />
                      RESET TO
                    </Button>
                  )}
                  {j + rounds[0].length * i + 1}
                </Cell>
                <Cell>{slot.user.name}</Cell>
                <Cell>{slot.prize?.name}</Cell>
              </Row>
            ))}
          </Table>
        </>
      ))}
    </>
  );
};

export default DraffleInProgress;
