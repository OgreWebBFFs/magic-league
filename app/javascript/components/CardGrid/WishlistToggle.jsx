import React, {useContext} from 'react';
import classNames from 'classnames';

import WishlistContext from '../../contexts/WishlistContext';
import xhrRequest from '../../helpers/xhr-request';

import Button from "../Button"

const putToWishlist = async (userId, cardId) => await xhrRequest({
  url: `/wishlists/${userId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ card_id: cardId })
  }
});

const WishlistToggle = ({ cardId, userId }) => {
  const {wishlist, setWishlist} = useContext(WishlistContext);
  const isWishlisted = wishlist.some(wishlistCard => wishlistCard.id === cardId);
  const toggleWishlist = async () => {
    const updatedWishlist = await putToWishlist(userId, cardId);
    setWishlist(updatedWishlist);
  } 
  return (
    <Button className={classNames(`wishlist-${cardId}__toggle`,  "card-grid__wishlist__toggle", "button--accent", {'active': isWishlisted})} onClick={toggleWishlist}>
      <i className="far fa-heart"></i>
    </Button>
  )
}

export default WishlistToggle;
