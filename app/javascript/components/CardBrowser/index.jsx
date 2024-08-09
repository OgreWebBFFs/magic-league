import React, { useState, useMemo } from 'react';
import { CardGrid, CardImageLink } from '../CardGrid';
import WishlistToggle from '../WishlistToggle';
import WishlistContext from '../../contexts/WishlistContext';
import useHashParams from '../../helpers/hooks/use-hash-params';
import BasicSearchControls from './BasicSearchControls';
import AdvancedSearchControls from './AdvancedSearchControls';
import { getCachedCards, isCachedCards } from './card-results-cache';
import AvailabilityChecker from '../UserDisplay/Dashboard/Wishlist/AvailabilityChecker';

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
              <CardImageLink card={card.attributes} />
              <div className="card-grid__card-actions">
                <div className="card-grid__card-action">
                    <AvailabilityChecker availabilities={card.attributes.ownerships.filter(({ keeper, user_id }) => user_id !== userId && !keeper)} />
                </div>
                <div className="card-grid__card-action">
                    <WishlistToggle userId={userId} cardId={card.attributes.id} />
                </div>
              </div>
            </>
          ))}
        </CardGrid>
      </WishlistContext.Provider>
    </div>
  );
};

export default CardBrowser;
