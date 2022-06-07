import React from 'react';
import { Row, Cell } from '../../../Table';
import CompleteButton from './CompleteButton';
import RerollButton from './RerollButton';

const DescriptionCell = ({ children }) => <Cell isPriority className="dashboard__objectives--description-cell">{children}</Cell>;
const ActionsCell = ({ children }) => <Cell className="dashboard__objectives--actions-cell">{children}</Cell>;

const within1Minute = (assignedAt) => {
  const now = new Date();
  const assignTime = new Date(assignedAt);
  return now - assignTime < 60000;
};

const ActiveObjectives = ({ activeObjectives, canReroll }) => (
  activeObjectives.map(({
    data: { attributes: { description, id, assigned_at: assignedAt } },
  }) => (
    <Row>
      <DescriptionCell>
        { within1Minute(assignedAt) ? <span className="new">NEW!</span> : null }
        { description }
      </DescriptionCell>
      <ActionsCell>
        <RerollButton canReroll={canReroll} description={description} id={id} />
        <CompleteButton description={description} id={id} />
      </ActionsCell>
    </Row>
  ))
);

export default ActiveObjectives;
