import React from 'react';
import { Row, Cell } from '../../Table';

const DescriptionCell = ({ children }) => <Cell isPriority className="dashboard__objectives--description-cell">{children}</Cell>;
const DateCell = ({ children }) => <Cell className="dashboard__objectives--date-cell">{children}</Cell>;
const TrophyCell = ({ children }) => <Cell className="dashbaord__objectives--trohpy-cell">{children}</Cell>;

const CompletedObjectives = ({ completedObjectives }) => (
  completedObjectives.map(
    ({ data: { attributes: { description, completed_at: completedAt } } }) => (
      <Row>
        <TrophyCell>🏆</TrophyCell>
        <DescriptionCell>{description}</DescriptionCell>
        <DateCell>{`Completed ${completedAt}`}</DateCell>
        <TrophyCell>🏆</TrophyCell>
      </Row>
    ),
  )
);

export default CompletedObjectives;
