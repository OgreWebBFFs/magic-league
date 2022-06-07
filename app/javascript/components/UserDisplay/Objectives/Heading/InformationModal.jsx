import React, { useState } from 'react';
import Button from '../../../Button';
import Modal from '../../../Modal';

const InformationModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <i className="fa fa-info-circle" />
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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

export default InformationModal;
