import React, { useState } from 'react';
import xhrRequest from '../../../../../helpers/xhr-request';
import Button from '../../../../Button';
import Modal from '../../../../Modal';

const completeObjective = async (id) => {
  await xhrRequest({
    url: `/user_objectives/${id}/complete`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const CompleteButton = ({ id, description }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button className="dashboard__active-objects--complete-cell-button" onClick={() => setModalOpen(true)}>
        <i className="fas fa-flag-checkered" />
      </Button>
      {modalOpen && (
        <Modal className="dashboard__active-objects--review-modal" onClose={() => setModalOpen(false)}>
          <h3>Declare Your Triumph</h3>
          <p>Confirm you have completed:</p>
          <p className="dashboard__active-objects--review-modal-description">{description}</p>
          <div className="modal__actions">
            <Button onClick={() => completeObjective(id)} className="modal__action-button approve">Confirm</Button>
            <Button onClick={() => setModalOpen(false)} className="modal__action-button reject">Cancel</Button>
          </div>
          <p className="modal__notice">
            You will receive a new quest upon confirming completion of the above.
            This new quest must be completed in a new game.
          </p>
        </Modal>
      )}
    </>
  );
};

export default CompleteButton;
