import React, { useState } from 'react';
import xhrRequest from '../../../../helpers/xhr-request';
import Button from '../../../Button';
import Modal from '../../../Modal';

const rerollObjectives = async (id) => {
  // eslint-disable-next-line no-alert
  window.confirm("Are you sure you would like to reroll your unkept objectives?");
  await xhrRequest({
    url: `/rerolls/${id}`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const RerollAction = ({ objectiveRerolls }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { used, allowed, id } = objectiveRerolls || {};

  if (!objectiveRerolls) {
    return null;
  }

  return (
    <>
      <div className="dashboard__reroll-action">
        {used < allowed ? (
          <Button onClick={() => rerollObjectives(id)} className="dashboard__reroll-action--btn">
            <i className="fas fa-dice" />
          </Button>
        ) : null}
        <p className="dashboard__reroll-action--text">
          {`Rerolls Available: ${used} / ${allowed}`}
        </p>
        <Button className="dashboard__reroll-action--info" onClick={() => setShowInfoModal(true)}>
          <i className="fa fa-info-circle" />
        </Button>
      </div>
      {showInfoModal && (
        <Modal onClose={() => setShowInfoModal(false)}>
          <h3>Reroll Rules</h3>
          <ul className="reroll-rules">
            <li className="reroll-rules__detail">You may reroll any of your three available quests a single time per week</li>
            <li className="reroll-rules__detail">
              You may elect not to reroll particular quests by selecting the &quot;keep&quot;
              checkbox next to that quest
            </li>
            <li className="reroll-rules__detail">When rerolling, you will only receive quests that you have not completed</li>
            <li className="reroll-rules__detail">
              You will receive one additional reroll each week. If you do not use a reroll
              in a given week, that reroll will remain and you may use it in a future week instead
            </li>
          </ul>
        </Modal>
      )}
    </>
  );
};

export default RerollAction;
