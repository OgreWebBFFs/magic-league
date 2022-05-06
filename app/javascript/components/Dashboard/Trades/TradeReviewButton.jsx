import React, { useState } from 'react';
import Button from '../../Button';
import Modal from '../../Modal';
import xhrRequest from '../../../helpers/xhr-request';

const updateTrade = async (trade, status) => {
  try {
    await xhrRequest({
      url: `/trades/${trade.id}`,
      options: {
        method: "PUT",
        body: JSON.stringify({ status }),
      }
    });
    console.log('GOT HERE!!');
    window.location.reload();
  } catch(e) {
    //Implement error handling for failed trade update
  }
};

const TradeReviewButton = ({ trade }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (<>
    <Button onClick={() => setModalOpen(true)} className="review-button">Review</Button>
    {modalOpen && <Modal onClose={() => setModalOpen(false)}>
      <p>Reviewing Trade off From:</p>
      <p>{trade.from.name}</p>
      <div style={{display: "flex"}}>
        <div style={{flex: "1 0 45%"}}>
          <p>You Will Receive:</p>
          <ul>
            {trade.from.cards.map(card => <li>{card.name}</li>)}
          </ul>
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 .5rem"}}><i className="fas fa-arrow-left"/><i className='fas fa-arrow-right'/></div>
        <div style={{flex: "1 0 45%"}}>
          <p>You Will Give:</p>
          <ul>
            {trade.to.cards.map(card => <li>{card.name}</li>)}
          </ul>
        </div>
      </div>
      <div style={{display: "flex"}}>
        <Button onClick={() => updateTrade(trade, "approved")} className="trade-review-modal__action-button approve">Approve</Button>
        <Button onClick={() => updateTrade(trade, "rejected")} className="trade-review-modal__action-button reject">Reject</Button>
      </div>
    </Modal>}
  </>)
}

export default TradeReviewButton;