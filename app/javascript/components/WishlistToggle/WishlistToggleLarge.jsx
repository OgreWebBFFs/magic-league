import React, { useState } from 'react';
import Button from '../Button';
import putToWishlist from './put-to-wishlist';

const RemoveFromWishlist = () => (
  <>
    <i className="far fa-heart" style={{ fontWeight: 'bold' }} />
    Remove from Wishlist
  </>
);

const AddToWishlist = () => (
  <>
    <i className="far fa-heart" />
    Add to Wishlist
  </>
);

const WishlistToggleLarge = ({ cardId, userId, isWishlistedInit }) => {
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedInit);
  const toggleWishlist = () => {
    putToWishlist(userId, cardId);
    setIsWishlisted(!isWishlisted);
  };
  return (
    <Button onClick={toggleWishlist}>
      {isWishlisted ? <RemoveFromWishlist /> : <AddToWishlist />}
    </Button>
  );
};

export default WishlistToggleLarge;
