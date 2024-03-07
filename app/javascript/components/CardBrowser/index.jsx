import React, { useState, useMemo, useEffect } from 'react';
import { CardGrid, CardImageLink } from '../CardGrid';
import { WishlistToggleSmall } from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge } from '../TradeProposal';
import useHashParams from '../../helpers/hooks/use-hash-params';
import BasicSearchControls from './BasicSearchControls';
import AdvancedSearchControls from './AdvancedSearchControls';
import usePreserveScroll from '../../helpers/hooks/use-preserve-scroll';


const CardBrowser = ({ userId, wishlist }) => {
  const [cards, setCards] = useState([]);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist);
  const [hashParams] = useHashParams();
  const { scrollToPrev } = usePreserveScroll();

  const isAdvanced = hashParams.advanced?.[0] === 'true';

  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist,
    setCurrentUserWishlist,
  }), [currentUserWishlist]);
  
  useEffect(() => {
    if (cards.length > 0) scrollToPrev();
  }, [cards]);
  
  return (
    <>
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
    </>
  );
};

export default CardBrowser;
