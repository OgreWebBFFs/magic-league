import React from 'react';
import xhrRequest from '../../../helpers/xhr-request';

const putToWishlist = async (user, card) => await xhrRequest({
  url: `/wishlists/${user.id}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ card_id: card.id })
  }
});

const WishlistToggle = ({ card, user, wishlist, setWishlist}) => {
  const isWishlisted = wishlist.some(wishlistCard => wishlistCard.id === card.id);
  const toggleWishlist = async () => {
    const updatedWishlist = await putToWishlist(user, card);
    setWishlist(updatedWishlist);
  } 
  return (
    <div className={`wishlist-${card.id}__toggle card-grid__wishlist__toggle ${isWishlisted ? 'active' : ''}`} onClick={toggleWishlist}>
      <i className="far fa-heart"></i>
    </div>
  )
}

export default WishlistToggle;