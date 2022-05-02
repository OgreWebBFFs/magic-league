import React from 'react';
import OwnershipTable from './OwnershipTable';
import { TradeProposalButtonLarge } from '../TradeProposal';
import formatCard from './format-card';
import WishlistToggleLarge from '../WishlistToggle/WishlistToggleLarge';
import { CardImage } from '../CardGrid';

const CardOwnership = ({ card, current_user_id, total_count, owner_details, wishlist }) => {
  const isWishlisted = wishlist[current_user_id] !== undefined;
  return (
    <>
      <h3 class="card-profile__title">
        {card.name}
      </h3>
      <div class="card-profile__card">
        <div style={{maxWidth: "220px", margin: 'auto'}}>
          <CardImage name={card.name} imageUrl={card.image_url} />
        </div>
      </div>
      <div class="card-profile__details">
        <div class="card-profile__action-bar">
          <TradeProposalButtonLarge 
            isAvailable={total_count > 0}
            card={formatCard(card, owner_details)}
            currentUserId={current_user_id}/>
          <WishlistToggleLarge 
            cardId={card.id}
            userId={current_user_id}
            isWishlistedInit={isWishlisted} />
        </div>
        <OwnershipTable 
          card={card}
          current_user_id={current_user_id}
          total_count={total_count}
          owner_details={owner_details} />
      </div>
    </>
  )
}

export default CardOwnership;