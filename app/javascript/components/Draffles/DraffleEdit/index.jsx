import React from 'react';
import EditDetails from './EditDetails';
import EditParticipants from './EditParticipants';
import EditPrizes from './EditPrizes';

const DraffleEdit = ({
  draffle,
  participants,
  users,
  prizes,
}) => (
  <>
    <h1>Draffle Creation Portal</h1>
    <EditDetails draffle={draffle} />
    <EditParticipants participants={participants} users={users} />
    <EditPrizes prizes={prizes} />
  </>
);

export default DraffleEdit;
