import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImage, WishlistToggle } from '../CardGrid';
import WishlistContext from '../../contexts/WishlistContext';
import TradeProposalButton from './TradeProposalButton';
import TradeProposalModal from './TradeProposalModal';


const CardBrowser = (props) => {
  const [cards, setCards] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [wishlist, setWishlist] = useState(props.wishlist);

  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={() => setCards([])}
      />
      <WishlistContext.Provider value={{ wishlist, setWishlist }}>
        <CardGrid>
          {cards.map(card => (
            <>
              <WishlistToggle userId={props.current_user_id} cardId={card.attributes.id} />
              <CardImage {...card.attributes} />
              <TradeProposalButton 
                isAvailable={card.attributes.users.data.length > 0}
                onClick={() => {
                  setCardSelected(card);
                  setModalOn(true);
                }}  
              />
            </>))}
        </CardGrid>
      </WishlistContext.Provider>
      {modalOn && (
        <TradeProposalModal 
          closeModal={() => setModalOn(false)} 
          card={cardSelected}
          currentUserId={props.current_user_id}
        />)}
    </>
  );
};

export default CardBrowser;