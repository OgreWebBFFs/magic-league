import React from 'react';

const WishlistContext = React.createContext({
  wishlist: [],
  setWishlist: () => null,
  wishlistBeingViewed: [],
});

export default WishlistContext;