import React, {useState} from 'react';
import OwnershipTable from './OwnershipTable';
import { TradeProposalButtonLarge, TradeProposalModal } from '../TradeProposal';
import formatCard from './format-card';


const CardOwnership = ({ card, current_user_id, total_count, owner_details }) => {
  const [modalOn, setModalOn] = useState(false);

  return (
    <>
      <div class="card-profile__action-bar">
        <div style={{minWidth: "170px", display: "inline-block"}}>
          <TradeProposalButtonLarge 
            isAvailable={total_count > 0}
            card={formatCard(card, owner_details)}
            currentUserId={current_user_id}/>
        </div>
      </div>
      <OwnershipTable 
        card={card}
        current_user_id={current_user_id}
        total_count={total_count}
        owner_details={owner_details} />
      {modalOn && <TradeProposalModal />}
    </>
  )
}

export default CardOwnership;