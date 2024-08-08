import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useEffectOnce } from 'react-use';
import WishlistContext from '../../contexts/WishlistContext';
import Button from '../Button';
import putToWishlist from './put-to-wishlist';

const WishlistToggleSmall = ({ cardId, userId }) => {
    const [animate, setAnimate] = useState(false);
    const {
        currentUserWishlist,
        setCurrentUserWishlist,
    } = useContext(WishlistContext);

    useEffectOnce(() => {
        setTimeout(() => setAnimate(true), 350);
    })

  const isWishlisted = currentUserWishlist.some(({ card }) => card.id === cardId);
  const toggleWishlist = async () => {
    const updatedWishlist = await putToWishlist(userId, cardId);
    setCurrentUserWishlist(updatedWishlist);
  };

  return (
    <Button style={{ position: 'relative', overflow: 'visible' }} onClick={toggleWishlist}>
      <div className={classNames('card-grid__card-action--toggle-indicator', {enabled: isWishlisted, animate})}>
        <i className="fas fa-heart" style={{ fontSize: '1.3rem' }} />
      </div>
      {isWishlisted ? 'Added!' : 'Wishlist'}
    </Button>
  );
};

export default WishlistToggleSmall;
