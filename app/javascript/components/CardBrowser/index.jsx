import React, { useState, useMemo } from 'react';
import { CardGrid, CardImageLink } from '../CardGrid';
import { WishlistToggleSmall } from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge } from '../TradeProposal';
import useHashParams from '../../helpers/hooks/use-hash-params';
import BasicSearchControls from './BasicSearchControls';
import AdvancedSearchControls from './AdvancedSearchControls';
import { getCachedCards, isCachedCards } from './card-results-cache';

const CardBrowser = ({ userId, wishlist }) => {
  const [hashParams] = useHashParams();
  const [cards, setCards] = useState(isCachedCards(hashParams) ? getCachedCards(hashParams) : []);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist);

  const isAdvanced = hashParams.advanced?.[0] === 'true';

  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist,
    setCurrentUserWishlist,
  }), [currentUserWishlist]);
  
  
  return (
    <div data-preserve-scroll="true">
      {isAdvanced ? (
          <AdvancedSearchControls setCards={setCards} />
        ) : (
          <BasicSearchControls setCards={setCards} />
        )
      }
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
    </div>
  );
};

export default CardBrowser;
