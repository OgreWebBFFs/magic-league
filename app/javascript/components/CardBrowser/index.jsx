import React, { useState, useMemo } from 'react';
import { CardGrid, CardImageLink } from '../CardGrid';
import { WishlistToggleSmall } from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import { TradeProposalButtonLarge } from '../TradeProposal';
import useHashParams from '../../helpers/hooks/use-hash-params';
import BasicBrowseControls from './BasicBrowseControls';
import AdvancedBrowseControls from './AdvancedBrowseControls';

const CardBrowser = ({ userId, wishlist }) => {
  const [cards, setCards] = useState([]);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(wishlist);
  const [hashParams] = useHashParams();
  
  const isAdvanced = hashParams.advanced?.[0] === 'true';

  const wishlistContextValues = useMemo(() => ({
    currentUserWishlist,
    setCurrentUserWishlist,
  }), [currentUserWishlist]);
  return (
    <>
      {isAdvanced ? (
          <AdvancedBrowseControls setCards={setCards} />
        ) : (
          <BasicBrowseControls setCards={setCards} />
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
