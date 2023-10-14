import React, { useState } from 'react';
import SearchInput from '../../../SearchInput';
import { CardGrid, CardImage } from '../../../CardGrid';
import PrizeSearch from './PrizeSearch';

const EditPrizes = ({ prizes }) => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [prizePool, setPrizePool] = useState(prizes);

  const addCardToPool = ({ attributes: { name, image_url: image }, id }) => {
    setPrizePool([
      { name, image, id, foilded: false },
      ...prizePool,
    ]);
  };

  return (
    <>
      <h2>Prizes</h2>
      <div className="edit-prizes">
        <PrizeSearch onAdd={(card) => addCardToPool(card)} />
        <div style={{ width: '2px', background: '#335f5d' }} />
        <CardGrid>
          {prizePool.map((prize) => (
            <CardImage
              key={prize.id}
              name={prize.name}
              imageUrl={prize.image}
            />
          ))}
        </CardGrid>
      </div>
    </>
  );
};

export default EditPrizes;
