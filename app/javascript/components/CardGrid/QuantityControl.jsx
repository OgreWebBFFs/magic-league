import React, { useState, useEffect } from 'react'
import { useDebounce, useFirstMountState } from 'react-use';
import xhrRequest from '../../helpers/xhr-request';

import Button from '../Button';

const storeQuantity = ({ collectionId, cardId, quantity, }) => xhrRequest({
  url: `/collections/${collectionId}`,
  options: {
    method: "PUT",
    body: JSON.stringify({
      id: collectionId,
      ownership: {
        count: quantity,
        card_id: cardId,
        collection_id: collectionId
      }
    })
  }
});

const QuantityControl = ({ collectionId, cardId, value }) => {
  const [quantity, setQuantity] = useState(value);
  const isInitial = useFirstMountState();

  useDebounce(() => {
    if (!isInitial)
      storeQuantity({ collectionId, cardId, quantity });
  }, 300, [quantity]);

  return (
    <div class="card-grid__quantity-control">
      <Button type="button" className="button--ghost" onClick={() => setQuantity(quantity-1)}><i class="material-icons">indeterminate_check_box</i></Button>
      <input
        type="number"
        readOnly="readonly"
        className="card-grid__quantity"
        value={quantity}
      />
      <Button type="button" className="button--ghost" onClick={() => setQuantity(quantity+1)}><i class="material-icons">add_box</i></Button>
  </div>
  )
};

export default QuantityControl;