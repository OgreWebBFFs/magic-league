import React, { useState } from 'react';
import SearchInput from '../../../SearchInput';

const PrizeSearch = ({ onAdd }) => {
  const [searchedCards, setSearchedCards] = useState([]);

  return (
    <div className="edit-prizes__card-search">
      <SearchInput
        onReset={() => setSearchedCards([])}
        onResults={(results) => setSearchedCards([...results])}
      />
      <div className="edit-prizes__card-search--results">
        {searchedCards.map((card) => (
          <button
            type="button"
            onClick={() => onAdd(card)}
          >
            {card.attributes.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrizeSearch;