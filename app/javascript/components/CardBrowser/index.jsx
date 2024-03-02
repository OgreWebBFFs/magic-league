import React, { useState, useMemo } from 'react';
import SearchInput from '../SearchInput';
import { CardGrid, CardImageLink } from '../CardGrid';
import { WishlistToggleSmall } from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge } from '../TradeProposal';
import useHashParams from '../../helpers/hooks/use-hash-params';

const CardBrowser = ({ userId, wishlist }) => {
  const [cards, setCards] = useState([]);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist);
  const [hashParams, updateHashParams] = useHashParams();
  

  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist,
    setCurrentUserWishlist,
  }), [currentUserWishlist]);
  return (
    <>
      <SearchInput
        onResults={(results, query) => {
          setCards(results);
          updateHashParams({query: [encodeURIComponent(query)]});
        }}
        onReset={() => {
          setCards([]);
          updateHashParams({});
        }}
      />
      <a href="/advanced_browse">
        Go to Advanced Browser &gt;
      </a>
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
