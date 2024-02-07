import React from 'react';
import OwnershipTable from './OwnershipTable';
import WishlistTable from './WishlistTable';
import { TradeProposalButtonLarge } from '../TradeProposal';
import formatCard from './format-card';
import WishlistToggleLarge from '../WishlistToggle/WishlistToggleLarge';
import { CardImage } from '../CardGrid';

const CardOwnership = ({
  card, currentUserId, totalCount, ownerDetails, wishlist, totalWishlisters, wishlisterDetails
}) => {
  const isWishlisted = wishlist[currentUserId] !== undefined;
  return (
    <>
      <h3 className="card-profile__title">
        {card.name}
      </h3>
      <div className="card-profile__card">
        {/*
          The below style seems to override what's in card-profile.scss for the above className
          When the below style is removed, card image is as large as it seemingly can be
        */}
        <div style={{ maxWidth: '350px', margin: 'auto' }}>
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
        <WishlistTable
          totalWishlisters={totalWishlisters}
          wishlisterDetails={wishlisterDetails}
        />
      </div>
    </>
  );
};

export default CardOwnership;
