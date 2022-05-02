import React, {useState} from 'react';
import Button from '../Button';
import xhrRequest from '../../helpers/xhr-request';

const RemoveFromWishlist = () => (
  <>
    <i className="far fa-heart" style={{fontWeight: "bold", fontSize: '1.2rem', marginRight: '.25rem'}}></i>
    Remove from Wishlist
  </>
);

const AddToWishlist = () => (
  <>
    <i className="far fa-heart" style={{fontSize: '1.2rem', marginRight: '.25rem'}}></i>
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