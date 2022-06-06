import React from 'react';
import { Table, Row, Cell } from '../../../Table';

const KeepCell = ({ children }) => <Cell className="dashboard__active-objects--keep-cell">{children}</Cell>;
const DescriptionCell = ({ children }) => <Cell className="dashboard__active-objects--description-cell">{children}</Cell>;

const CompletedObjectives = ({ completedObjectives }) => (
  <Table>
    <Row isHeading>
      <KeepCell>Date</KeepCell>
      <DescriptionCell>🏆 Triumphs 🏆</DescriptionCell>
    </Row>
    {completedObjectives.map(({ data: { attributes: { description, completed_at } } }) => (
      <Row>
        <KeepCell>{completed_at}</KeepCell>
        <DescriptionCell>
          { description }
        </DescriptionCell>
      </Row>
    ))}
  </Table>
);

export default CompletedObjectives;
