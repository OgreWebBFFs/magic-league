import React from 'react';
import { Cell, Row, Table } from '../../Table';

const EventPerformanceTracer = () => (
  <div className="dashboard-profile__performance">
    <div className="dashboard-profile__performance-points">
      <p className="digit">11</p>
      <p>points</p>
    </div>
    <Table>
      <Row>
        <Cell>⚔️ Victory:</Cell>
        <Cell className="digit">5</Cell>
      </Row>
      <Row>
        <Cell>👑 Quest: </Cell>
        <Cell className="digit">6</Cell>
      </Row>
    </Table>
  </div>
);

export default EventPerformanceTracer;
