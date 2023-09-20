import React, { useState } from 'react';
import Modal from '../../Modal';
import SearchInput from '../../SearchInput';
import { CardGrid, CardImage } from '../../CardGrid';
import xhrRequest from '../../../helpers/xhr-request';
import PrizeEditor from './PrizeEditor';
import ParticipantsEditor from './ParticipantsEditor';
import Button from '../../Button';

const DraffleEdit = ({ draffle, users }) => {
  const [participants, setParticipants] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);
  const [prizePool, setPrizePool] = useState([]);
  const [prizeToEdit, setPrizeToEdit] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h2>{draffle.name}</h2>
      <p>{draffle.status}</p>
      <div>
        {participants.map((participant) => (
          <div>{participant.name}</div>
        ))}
        <Button onClick={() => setIsModalOpen(true)}>Add Participants</Button>
      </div>
      <SearchInput
        onReset={() => setSearchedCards([])}
        onResults={(results) => setSearchedCards([...results])}
      />
      <div>
        {searchedCards.map((card) => (
          <button
            type="button"
            onClick={() => setPrizePool([
              ...prizePool,
              {
                name: card.attributes.name,
                image: card.attributes.image_url,
                id: card.id,
                foil: false,
              },
            ])}
          >
            {card.attributes.name}
          </button>
        ))}
      </div>
      <CardGrid>
        {prizePool.map((prize, i) => (
          <div
            onClick={() => {
              setPrizeToEdit(prize);
            }}
          >
            <CardImage
              key={`${prize.name}_${i}`}
              name={prize.name}
              imageUrl={prize.image}
              foiled={prize.foiled}
            />
          </div>
        ))}
      </CardGrid>
      {prizeToEdit
        && (
          <PrizeEditor
            prize={prizeToEdit}
            onClose={(newPrize) => {
              const i = prizePool.indexOf(prizeToEdit);
              setPrizePool([...prizePool.slice(0, i), newPrize, ...prizePool.slice(i+1)]);
              setPrizeToEdit(null);
            }}
          />
        )}

      {isModalOpen
        && (
          <ParticipantsEditor
            users={users}
            participants={participants}
            onClose={(newParticipants) => {
              setParticipants(newParticipants);
              setIsModalOpen(false);
            }}
          />
        )}
    </>
  );
};

export default DraffleEdit;
