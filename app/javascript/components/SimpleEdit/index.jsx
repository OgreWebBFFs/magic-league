import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import { CardGrid, CardImage } from '../Dashboard/CardGrid';
import xhrRequest from '../../helpers/xhr-request';
import QuantityControl from '../Dashboard/CardGrid/QuantityControl';

const fetchCollection = async (userId) => (await xhrRequest({
  url: `/collections/${userId}`,
  options: { method: 'GET' }
})).data


const SimpleEdit = (props) => {
  const [cards, setCards] = useState([]);
  
  const resetToCollection = async (cards) => setCards(await fetchCollection(props.user_id));
  
  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={resetToCollection}
      />
      <CardGrid>
        {cards.map(card => (
          <>
            <CardImage key={`${card.attributes.name} image`} {...card.attributes} />
            <QuantityControl
              key={`${card.attributes.name} quantity`}
              collectionId={props.collection_id}
              cardId={card.attributes.id}
              value={card.attributes.count_in_collection}
            />
          </>
        ))}
      </CardGrid>
    </>
  )
};

export default SimpleEdit;