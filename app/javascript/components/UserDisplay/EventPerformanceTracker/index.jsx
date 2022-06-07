import React from 'react';
import { Cell, Row, Table } from '../../Table';

const EventPerformanceTracer = ({
  eventRanking: {
    victory_points: victoryPoints,
    objective_points: objectivePoints,
    matches,
  },
}) => (
  <div className="dashboard-profile__performance">
    <div className="dashboard-profile__performance-points">
      <p className="digit">{victoryPoints + objectivePoints}</p>
      <p>points</p>
      <p className="dashboard-profile__performance-match-num">{`in ${matches} match${matches === 1 ? '' : 'es'}`}</p>
    </div>
    <Table>
      <Row>
        <Cell>⚔️ Victory:</Cell>
        <Cell className="digit">{victoryPoints}</Cell>
      </Row>
      <Row>
        <Cell>👑 Quest: </Cell>
        <Cell className="digit">{objectivePoints}</Cell>
      </Row>
    </Table>
  </div>
);

export default EventPerformanceTracer;
