import React, { useState } from 'react';
import SearchInput from '../../SearchInput';
import { CardGrid, CardImage } from '../../CardGrid';
import Button from '../../Button';
import updateDraffle from './update-draffle';
import PrizeEditor from './PrizeEditor';
import ParticipantsEditor from './ParticipantsEditor';
import Toggle from '../../Toggle';
import xhrRequest from '../../../helpers/xhr-request';

const initializeParticipantInfo = (participants) => participants.map(
  (participant) => ({ ...participant.user }),
);

const startDraffle = async (draffle) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/start`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

const DraffleEdit = ({
  draffle,
  users,
  participants,
  prizes,
}) => {
  const [participantsList, setParticipantsList] = useState(initializeParticipantInfo(participants));
  const [random, setRandom] = useState(false);
  const [searchedCards, setSearchedCards] = useState([]);
  const [prizePool, setPrizePool] = useState([...prizes]);
  const [prizeToEdit, setPrizeToEdit] = useState();
  const [roundsEdit, setRoundsEdit] = useState(draffle.rounds);
  const [snakeEdit, setSnakeEdit] = useState(draffle.snake);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2>{draffle.name}</h2>
        <Button
          onClick={
            () => updateDraffle(
              draffle.id,
              participantsList,
              prizePool,
              random,
              roundsEdit,
              snakeEdit,
            )
          }
        >
          <i className="fas fa-save" />
          SAVE
        </Button>
        <Button onClick={() => startDraffle(draffle)}>
          <i className="fas fa-play" />
          START
        </Button>
      </div>
      <p>{draffle.status}</p>
      <input
        type="number"
        value={roundsEdit}
        min="1"
        onChange={(e) => setRoundsEdit(e.target.value)}
      />
      <div>
        <h2>Snake?</h2>
        <Toggle
          name="snake-toggle"
          checked={snakeEdit}
          onClick={() => setSnakeEdit(!snakeEdit)}
          options={['on', 'off']}
        />
      </div>
      <div>
        {participantsList.map((participant) => (
          <div>{participant.name}</div>
        ))}
        <Button onClick={() => setIsModalOpen(true)}>Add Participants</Button>
        <label htmlFor="randomize-draft-order">Randomize Order?</label>
        <input style={{ opacity: '100%' }} type="checkbox" id="randomize-draft-order" value={random} onClick={() => setRandom(!random)} />
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
                card_id: card.id,
                foiled: false,
              },
            ])}
          >
            {card.attributes.name}
          </button>
        ))}
      </div>
      <CardGrid>
        {prizePool.map((prize, i) => (
          <PrizeEditor prize={prize} />
        ))}
      </CardGrid>
      {/* {prizeToEdit
        && (
          <PrizeEditor
            prize={prizeToEdit}
            onClose={(newPrize) => {
              const i = prizePool.indexOf(prizeToEdit);
              setPrizePool([...prizePool.slice(0, i), newPrize, ...prizePool.slice(i + 1)]);
              setPrizeToEdit(null);
            }}
          />
        )} */}
      {isModalOpen
        && (
          <ParticipantsEditor
            users={users}
            participants={participantsList}
            onClose={(newParticipants) => {
              setParticipantsList(newParticipants);
              setIsModalOpen(false);
            }}
          />
        )}
    </>
  );
};

export default DraffleEdit;
