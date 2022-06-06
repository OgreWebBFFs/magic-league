/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Collection from './Collection';
import Wishlist from './Wishlist';
import Trades from './Trades';

export default {
  collection: {
    view: (props) => <Collection {...props} />,
    notification: () => false,
    actions: ['view-toggle', 'edit'],
  },
  wishlist: {
    view: (props) => <Wishlist {...props} />,
    notification: () => false,
    actions: ['view-toggle'],
  },
  trades: {
    view: (props) => <Trades {...props} />,
    notification: ({ trades, currentUserId }) => trades.some(({ data: { attributes } }) => (
      attributes.to.id === currentUserId && attributes.status === 'pending'
    )),
    actions: [],
  },
};
