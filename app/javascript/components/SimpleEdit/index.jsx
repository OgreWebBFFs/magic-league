import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImageLink, QuantityControl } from '../CardGrid';
import xhrRequest from '../../helpers/xhr-request';

const fetchCollection = async (userId) => (await xhrRequest({
  url: `/collections/${userId}`,
  options: { method: 'GET' },
})).data;

const SimpleEdit = ({ userId, collectionId }) => {
  const [cards, setCards] = useState([]);

  const resetToCollection = async () => setCards(await fetchCollection(userId));

  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={resetToCollection}
      />
      <a href={`/collections/${collectionId}/bulk_edit`}>
        Go to Bulk Edit &gt;
      </a>
      <CardGrid>
        {cards.map((card) => (
          <>
            <CardImageLink key={`${card.attributes.name} image`} card={card.attributes} />
            <QuantityControl
              key={`${card.attributes.name} quantity`}
              collectionId={collectionId}
              cardId={card.attributes.id}
              value={card.attributes.count_in_collection}
            />
          </>
        ))}
      </CardGrid>
    </>
  );
};

export default SimpleEdit;
