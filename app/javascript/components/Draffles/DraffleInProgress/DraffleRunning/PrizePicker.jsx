import React, { useState } from 'react';
import Button from "../../../Button";
import LoadingTakeOver from '../../LoadingTakeOver';
import xhrRequest from '../../../../helpers/xhr-request';

const makePick = async (draffleId, prizeId) => xhrRequest({
  url: `/draffles/${draffleId}/pick`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ prize_id: Number.parseInt(prizeId, 10) })
  },
});

const PrizePicker = ({ availablePrizes, draffleId }) => {
  const [loading, setLoading] = useState(false);
  const [prizeId, setPrizeId] = useState(null);

  return (
    <>
      <select name="prizes" id="prizes" onChange={(e) => setPrizeId(e.target.value)}>
        <option value="" disabled selected hidden>Choose a Prize...</option>
        {availablePrizes.map(prize => (
          <option value={prize.id}>{prize.name}</option>
        ))}
      </select>
      <Button
        disabled={prizeId === null}
        onClick={async () => {
          setLoading(true);
          await makePick(draffleId, prizeId);
          window.location.reload();
        }}
      >
        Make Pick
      </Button>
      {loading && <LoadingTakeOver />}
    </>
  )

};

export default PrizePicker;
