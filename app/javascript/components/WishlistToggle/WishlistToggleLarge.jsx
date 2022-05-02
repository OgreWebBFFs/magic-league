import React, {useState} from 'react';
import Button from '../Button';
import xhrRequest from '../../helpers/xhr-request';

const RemoveFromWishlist = () => (
  <>
    <i className="far fa-heart" style={{fontWeight: "bold"}}></i>
    Remove from Wishlist
  </>
);

const AddToWishlist = () => (
  <>
    <i className="far fa-heart"></i>
    Add to Wishlist
  </>
)

const putToWishlist = async (userId, cardId) => await xhrRequest({
  url: `/wishlists/${userId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ card_id: cardId })
  }
});

const WishlistToggleLarge = ({ cardId, userId, isWishlistedInit }) => {
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedInit);
  const toggleWishlist = () => {
    putToWishlist(userId, cardId);
    setIsWishlisted(!isWishlisted);
  }
  return (
    <Button onClick={toggleWishlist}> 
      {isWishlisted ? <RemoveFromWishlist /> : <AddToWishlist />}
    </Button>
  )
}

export default WishlistToggleLarge;