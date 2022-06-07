import React from 'react';
import { Row, Cell } from '../../../Table';
import InformationModal from './InformationModal';

const TitleCell = ({ children }) => <Cell className="dashboard__objectives-heading--title">{children}</Cell>;
const InfoCell = ({ children }) => <Cell className="dashboard__objectives-heading--info">{children}</Cell>;
const RerollCell = ({ children }) => <Cell className="dashboard__objectives-heading--reroll">{children}</Cell>;

const Heading = ({ objectiveRerolls, edit }) => (
  <Row isHeading className="dashboard__objectives-heading">
    <TitleCell>
      Quests
    </TitleCell>
    <InfoCell>
      <InformationModal />
    </InfoCell>
    {edit && (
      <RerollCell>
        {`Rerolls Available: ${objectiveRerolls.allowed - objectiveRerolls.used}`}
      </RerollCell>
    )}
  </Row>
);

export default Heading;
