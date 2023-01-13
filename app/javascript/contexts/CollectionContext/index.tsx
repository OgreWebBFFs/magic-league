import React from 'react';

const CollectionContext = React.createContext({
  baseCollection: [],
  setCollection: () => null,
  collectionToRender: [],
});

export default CollectionContext;
