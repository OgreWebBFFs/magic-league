import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImageLink } from '../CardGrid';
import QuantityControl from './QuantityControl';
import xhrRequest from '../../helpers/xhr-request';

const fetchCollection = async (userId) => (await xhrRequest({
  url: `/collections/${userId}`,
  options: { method: 'GET' },
})).data;

const initialQuantity = (card, userId) => card.attributes.ownerships.data.find(( ownership ) => (
    ownership.attributes.user.id === userId
))?.attributes.quantity || 0;

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
                    initialValue={initialQuantity(card, userId)}
                />
            </>
        ))}
      </CardGrid>
    </>
  );
};

export default SimpleEdit;
