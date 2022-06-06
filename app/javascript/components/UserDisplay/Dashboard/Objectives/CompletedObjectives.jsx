import React from 'react';
import { Table, Row, Cell } from '../../../Table';

const KeepCell = ({ children }) => <Cell className="dashboard__active-objectives--keep-cell">{children}</Cell>;
const DescriptionCell = ({ children }) => <Cell className="dashboard__active-objectives--description-cell">{children}</Cell>;

const CompletedObjectives = ({ completedObjectives, user }) => (
  completedObjectives.length === 0 ? (
    <p className="dashboard__active-objectives--empty-msg">
      {`${user.name} has yet to prevail in their conquests`}
    </p>
  ) : (
    <Table>
      <Row isHeading>
        <KeepCell>Date</KeepCell>
        <DescriptionCell>🏆 Triumphs 🏆</DescriptionCell>
      </Row>
      {completedObjectives.map(
        ({ data: { attributes: { description, completed_at: completedAt } } }) => (
          <Row>
            <KeepCell>{completedAt}</KeepCell>
            <DescriptionCell>
              { description }
            </DescriptionCell>
          </Row>
        ),
      )}
    </Table>
  )
);

export default CompletedObjectives;
