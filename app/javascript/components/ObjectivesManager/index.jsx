import React from 'react';
import { Table, Row, Cell } from '../Table';
import ObjectiveManagerRow from './ObjectiveManagerRow';
import CreateObjective from './CreateObjective';

const DescriptionCell = ({ children }) => <Cell className="objectives-manager__description-cell">{children}</Cell>;
const IntCell = ({ children }) => <Cell className="objectives-manager__int-cell">{children}</Cell>;
const ControlsCell = ({ children }) => <Cell className="objectives-manager__controls-cell">{children}</Cell>;

const ObjectivesManager = ({ objectives }) => (
  <>
    <CreateObjective />
    <Table>
      <Row isHeading>
        <IntCell>Id</IntCell>
        <DescriptionCell>Description</DescriptionCell>
        <ControlsCell />
      </Row>
      {objectives.map(({id, description, value}) =>(
        <Row>
          <ObjectiveManagerRow id={id} description={description} value={value} />
        </Row>
      ))}
    </Table>
  </>
);

export default ObjectivesManager;
