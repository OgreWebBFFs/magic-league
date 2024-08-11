import React from 'react';

const KeeplistContext = React.createContext({
  keeplist: [],
  setWishlist: () => null,
});

export default KeeplistContext;
