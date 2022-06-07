import React from 'react';
import { Row, Cell } from '../../../Table';
import InformationModal from './InformationModal';

const TitleCell = ({ children }) => <Cell className="dashboard__objectives-heading--title">{children}</Cell>;
const RerollCell = ({ children }) => <Cell className="dashboard__objectives-heading--reroll">{children}</Cell>;

const Heading = ({ objectiveRerolls, edit }) => (
  <Row isHeading className="dashboard__objectives-heading">
    <TitleCell>
      Quests
      <InformationModal />
    </TitleCell>
    {edit && (
      <RerollCell>
        {`Rerolls Available: ${objectiveRerolls ? objectiveRerolls.allowed - objectiveRerolls.used : '?'}`}
      </RerollCell>
    )}
  </Row>
);

export default Heading;
