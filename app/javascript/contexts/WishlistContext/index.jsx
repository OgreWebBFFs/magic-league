import React from 'react';

const WishlistContext = React.createContext({
  wishlist: [],
  setWishlist: () => null,
});

export default WishlistContext;