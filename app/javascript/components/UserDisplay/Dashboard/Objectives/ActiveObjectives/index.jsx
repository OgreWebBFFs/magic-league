/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Table, Row, Cell } from '../../../../Table';
import CompleteButton from './CompleteButton';
import KeepToggle from './KeepToggle';
import EmptyObjectives from './EmptyObjectives';

const KeepCell = ({ children }) => <Cell className="dashboard__active-objectives--keep-cell">{children}</Cell>;
const DescriptionCell = ({ children }) => <Cell isPriority className="dashboard__active-objectives--description-cell">{children}</Cell>;
const CompleteCell = ({ children }) => <Cell className="dashboard__active-objectives--complete-cell">{children}</Cell>;

const ActiveObjectives = ({ activeObjectives, currentUserId }) => (
  activeObjectives.length === 0 ? (<EmptyObjectives currentUserId={currentUserId} />) : (
    <Table>
      <Row isHeading>
        <KeepCell>Keep</KeepCell>
        <DescriptionCell>Quest</DescriptionCell>
      </Row>
      {activeObjectives.map(({ data: { attributes: { description, id } } }) => (
        <Row>
          <KeepCell>
            <KeepToggle id={id} />
          </KeepCell>
          <DescriptionCell>
            { description }
          </DescriptionCell>
          <CompleteCell>
            <CompleteButton description={description} id={id} />
          </CompleteCell>
        </Row>
      ))}
    </Table>
  )
);

export default ActiveObjectives;
