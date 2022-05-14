import React, { useState, useMemo } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImageLink } from '../CardGrid';
import { WishlistToggleSmall } from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge } from '../TradeProposal';

const CardBrowser = ({ userId, wishlist }) => {
  const [cards, setCards] = useState([]);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist);

  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist,
    setCurrentUserWishlist,
  }), [currentUserWishlist]);
  return (
    <>
      <SearchInput
        onResults={setCards}
        onReset={() => setCards([])}
      />
      <WishlistContext.Provider value={wishlistContextValues}>
        <CardGrid>
          {cards.map((card) => (
            <>
              <WishlistToggleSmall userId={userId} cardId={card.attributes.id} />
              <CardImageLink card={card.attributes} />
              <TradeProposalButtonLarge
                isAvailable={card.attributes.users.data.length > 0}
                card={card}
                currentUserId={userId}
              />
            </>
          ))}
        </CardGrid>
      </WishlistContext.Provider>
    </>
  );
};

export default CardBrowser;
