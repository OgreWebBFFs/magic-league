import React from 'react';
import OwnershipTable from './OwnershipTable';
import { TradeProposalButtonLarge } from '../TradeProposal';
import formatCard from './format-card';
import WishlistToggleLarge from '../WishlistToggle/WishlistToggleLarge';
import { CardImage } from '../CardGrid';

const CardOwnership = ({
  card, currentUserId, totalCount, ownerDetails, wishlist,
}) => {
  const isWishlisted = wishlist[currentUserId] !== undefined;
  return (
    <>
      <h3 className="card-profile__title">
        {card.name}
      </h3>
      <div className="card-profile__card">
        <div style={{ maxWidth: '220px', margin: 'auto' }}>
          <CardImage name={card.name} imageUrl={card.image_url} />
        </div>
      </div>
      <div className="card-profile__details">
        <div className="card-profile__action-bar">
          <TradeProposalButtonLarge
            isAvailable={totalCount > 0}
            card={formatCard(card, ownerDetails)}
            currentUserId={currentUserId}
          />
          <WishlistToggleLarge
            cardId={card.id}
            userId={currentUserId}
            isWishlistedInit={isWishlisted}
          />
        </div>
        <OwnershipTable
          card={card}
          currentUserId={currentUserId}
          totalCount={totalCount}
          ownerDetails={ownerDetails}
        />
      </div>
    </>
  );
};

export default CardOwnership;
