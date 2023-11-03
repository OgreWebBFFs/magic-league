/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardGrid } from '../../../CardGrid';
import PrizeSearch from './PrizeSearch';
import Divider from './Divider';
import PrizeEditor from './PrizeEditor';

const EditPrizes = ({ prizes, onChange }) => {
  const [prizePool, setPrizePool] = useState(prizes);

  useEffect(() => {
    onChange(prizePool);
  }, [prizePool]);

  const addCardToPool = ({ attributes: { name, image_url: image }, id: card_id }) => {
    setPrizePool([
      {
        name, image, card_id, foilded: false, id: uuidv4(),
      },
      ...prizePool,
    ]);
  };

  const editCardInPool = (updatedPrize) => {
    const i = prizePool.findIndex((prize) => prize.id === updatedPrize.id);
    setPrizePool([...prizePool.slice(0, i), updatedPrize, ...prizePool.slice(i + 1)]);
  };

  const removeCardInPool = (toRemove) => {
    setPrizePool(prizePool.filter((prize) => prize.id !== toRemove.id));
  };

  return (
    <>
      <h2>Prizes</h2>
      <div className="edit-prizes">
        <PrizeSearch onAdd={(card) => addCardToPool(card)} />
        <Divider />
        <CardGrid>
          {prizePool.map((prize) => (
            <PrizeEditor
              key={prize.id}
              prize={prize}
              onUpdate={(card) => editCardInPool(card)}
              onDelete={(card) => removeCardInPool(card)}
            />
          ))}
        </CardGrid>
      </div>
    </>
  );
};

export default EditPrizes;
