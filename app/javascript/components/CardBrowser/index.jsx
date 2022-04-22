import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImage } from '../CardGrid';
import TradeProposalButton from './TradeProposalButton';
import TradeProposalModal from './TradeProposalModal';


const CardBrowser = ({ current_user_id }) => {
  const [cards, setCards] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [cardSelected, setCardSelected] = useState({});

  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={() => setCards([])}
      />
      <CardGrid>
        {cards.map(card => (
          <>
            <CardImage {...card.attributes} />
            <TradeProposalButton 
              isAvailable={card.attributes.users.data.length > 0}
              onClick={() => {
                setCardSelected(card);
                setModalOn(true);
              }}  
            />
          </>)
        )}
      </CardGrid>
      {modalOn && (
        <TradeProposalModal 
          closeModal={() => setModalOn(false)}
          card={cardSelected}
          currentUserId={current_user_id}
        />
      )}
    </>
  );
};

export default CardBrowser;