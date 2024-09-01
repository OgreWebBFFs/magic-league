import React, { useMemo, useState } from 'react';
import OwnershipTable from './OwnershipTable';
import WishlistTable from './WishlistTable';
import { CardImage } from '../CardGrid';
import WishlistToggle from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';

const CardOwnership = ({
  card, currentUserId, totalCount, ownerships, wishlist, messageStatuses, totalWishlisters, wishlisterDetails
}) => {
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist[currentUserId] !== undefined ? [{ card }] : []);
  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist, setCurrentUserWishlist,
  }), [wishlist, currentUserWishlist]);

  return (
    <WishlistContext.Provider value={wishlistContextValues}>
      <h3 className="card-profile__title">
        {card.name}
      </h3>
      <div className="card-profile__card">
        {/*
          The below style seems to override what's in card-profile.scss for the above className
          When the below style is removed, card image is as large as it seemingly can be
        */}
        <div style={{ maxWidth: '350px', margin: 'auto' }}>
          <CardImage name={card.name} imageUrl={card.image_url} backImageUrl={card.back_image_url} />
          <div className="card-grid__card-action" style={{ marginBottom: '1rem' }}>
            <WishlistToggle cardId={card.id} userId={currentUserId} />
          </div>
        </div>
      </div>
      <div className="card-profile__details">
        <OwnershipTable
          card={card}
          currentUserId={currentUserId}
          totalCount={totalCount}
          ownerships={ownerships}
          messageStatuses={messageStatuses}
        />
        <WishlistTable
          totalWishlisters={totalWishlisters}
          wishlisterDetails={wishlisterDetails}
        />
      </div>
    </WishlistContext.Provider>
  );
};

export default CardOwnership;
