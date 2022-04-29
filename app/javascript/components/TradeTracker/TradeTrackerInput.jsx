import React, { useState } from 'react';
import { useDebounce, useFirstMountState } from 'react-use';
import xhrRequest from '../../helpers/xhr-request';

const updateUsedTrades = ({ rarity, value, currentUserId }) => xhrRequest({
  url: '/received_trades',
  options: {
    method: 'POST',
    body: JSON.stringify({
        user_id: currentUserId,
        rarity,
        num_received: value,
    })
  }
})

const TradeTrackerInput = ({rarity, num_received, num_allowed, currentUserId, isOwner}) => {
  const [value, setValue] = useState(num_received);
  const isInitial = useFirstMountState();

  useDebounce(async () => {
    if (!isInitial)
      updateUsedTrades({ rarity, value, currentUserId});
  }, 300, [value]);

  return (
    <input
      type="number"
      value={value}
      label={rarity}
      min="0"
      max={num_allowed}
      disabled={!isOwner}
      onChange={(e) => setValue(e.target.value)}/>
  )
}

export default TradeTrackerInput