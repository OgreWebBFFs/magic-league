import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImageLink } from '../CardGrid';
import EditControls from './EditControls';
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
                <EditControls key={`${card.attributes.name} controls`} card={card} collectionId={collectionId} />
            </>
        ))}
      </CardGrid>
    </>
  );
};

export default SimpleEdit;
