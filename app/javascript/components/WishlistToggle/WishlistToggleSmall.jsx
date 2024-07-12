import React, { useContext } from 'react';
import classNames from 'classnames';
import WishlistContext from '../../contexts/WishlistContext';
import Button from '../Button';
import putToWishlist from './put-to-wishlist';

const WishlistToggleSmall = ({ cardId, userId }) => {
  const {
    currentUserWishlist,
    setCurrentUserWishlist,
  } = useContext(WishlistContext);
  const isWishlisted = currentUserWishlist.some((wishlistCard) => wishlistCard.id === cardId);
  const toggleWishlist = async () => {
    const updatedWishlist = await putToWishlist(userId, cardId);
    setCurrentUserWishlist(updatedWishlist);
  };
  return (
    <Button className={classNames('button--togglable button--small', { on: isWishlisted })} onClick={toggleWishlist} style={{ flexDirection: 'column' }}>
      <i className={classNames({far: !isWishlisted, fas: isWishlisted}, "fa-heart")} style={{ fontSize: '1.6rem' }} />
      {isWishlisted ? 'Added!' : 'Wishlist'}
    </Button>
  );
};

export default WishlistToggleSmall;
