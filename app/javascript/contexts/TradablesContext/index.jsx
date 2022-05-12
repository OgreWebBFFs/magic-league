import React from 'react';

const TradablesContext = React.createContext({
  tradables: [],
  setTradables: () => null,
});

export default TradablesContext;