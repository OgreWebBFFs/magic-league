import React, { useState } from 'react';
import xhrRequest from '../../../../helpers/xhr-request';
import Button from '../../../Button';
import Modal from '../../../Modal';

const rerollObjective = async (id) => {
  await xhrRequest({
    url: `/user_objectives/${id}/reroll`,
    options: {
      method: 'PATCH',
    },
  });
  window.location.reload();
};

const RerollButton = ({ description, id, canReroll }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {canReroll && (
        <Button onClick={() => setShowModal(true)}>
          <i className="fas fa-random" />
        </Button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Receive A New Quest</h3>
          <p>Would you like to exchange</p>
          <p className="modal__text-important">{description}</p>
          <p>for a new quest?</p>
          <div className="modal__actions">
            <Button onClick={() => rerollObjective(id)} className="modal__action-button approve">Yes</Button>
            <Button onClick={() => setShowModal(false)} className="modal__action-button reject">No</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RerollButton;
