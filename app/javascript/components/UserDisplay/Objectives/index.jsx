/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Table } from '../../Table';
import ActiveObjectives from './ActiveObjectives';
import CompletedObjectives from './CompletedObjectives';
import EmptyObjectives from './EmptyObjectives';
import Heading from './Heading';

const Objectives = ({
  activeObjectives,
  completedObjectives,
  currentUserId,
  edit,
  objectiveRerolls,
  user,
}) => (
  <Table>
    <Heading objectiveRerolls={objectiveRerolls} edit={edit} />
    {activeObjectives.length === 0 && completedObjectives.length === 0 ? (
      <EmptyObjectives currentUserId={currentUserId} user={user} />
    ) : (
      <>
        <ActiveObjectives
          activeObjectives={activeObjectives}
          canReroll={objectiveRerolls.used < objectiveRerolls.allowed}
        />
        <CompletedObjectives completedObjectives={completedObjectives} />
      </>
    )}
  </Table>
);

export default Objectives;
