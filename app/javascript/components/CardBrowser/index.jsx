import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImage, WishlistToggle } from '../CardGrid';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge, TradeProposalModal } from '../TradeProposal';

const CardBrowser = (props) => {
  const [cards, setCards] = useState([]);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(props.current_user_wishlist);

  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={() => setCards([])}
      />
      <WishlistContext.Provider value={{ currentUserWishlist, setCurrentUserWishlist }}>
        <CardGrid>
          {cards.map(card => (
            <>
              <WishlistToggle userId={props.current_user_id} cardId={card.attributes.id} />
              <CardImage {...card.attributes} />
              <TradeProposalButtonLarge 
                isAvailable={card.attributes.users.data.length > 0}
                card={card}
                currentUserId={props.current_user_id}
              />
            </>))}
        </CardGrid>
      </WishlistContext.Provider>
    </>
  );
};

export default CardBrowser;