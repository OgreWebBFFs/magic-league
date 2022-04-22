import React, { useState, useEffect } from 'react';
import { useDebounce, useFirstMountState } from 'react-use';
import xhrRequest from '../../helpers/xhr-request';

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
    <div class="card-grid__counter">
      <button type="button" class="card-grid__counter_decrement__btn" onClick={() => setQuantity(quantity-1)}><i class="material-icons">indeterminate_check_box</i></button>
      <input
        type="number"
        readOnly="readonly"
        className="card-grid_counter_count"
        value={quantity}
      />
      <button type="button" class="card-grid__counter_increment__btn" onClick={() => setQuantity(quantity+1)}><i class="material-icons">add_box</i></button>
  </div>
  )
};

export default QuantityControl;