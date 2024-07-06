import React from 'react';
import xhrRequest from '../../helpers/xhr-request';

const storeTradable = ({ collectionId, cardId, tradable }) => xhrRequest({
  url: `/collections/${collectionId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({
      id: collectionId,
      tradable: {
        tradable: tradable === "unknown" ? null : tradable === "true",
        card_id: cardId,
        collection_id: collectionId,
      },
    }),
  },
});

const TradableDropdown = ({ collectionId, cardId, initialValue }) => (
    <div className="card-grid__quantity-control">
      <select 
        defaultValue={initialValue}
        onChange={(e) => storeTradable({
            collectionId,
            cardId,
            tradable: e.target.value
      })}>
        <option value="true">Definitely</option>
        <option value="unknown">Undecided</option>
        <option value="false">Not Likely</option>
      </select>
    </div>
);

export default TradableDropdown;