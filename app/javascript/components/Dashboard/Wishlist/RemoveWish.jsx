import React, {useContext} from 'react';
import Button from '../../Button';
import WishlistContext from '../../../contexts/WishlistContext';
import xhrRequest from '../../../helpers/xhr-request';

const putToWishlist = async (user, card) => await xhrRequest({
  url: `/wishlists/${user.id}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ card_id: card.id })
  }
});

const RemoveWish = ({ card, user, classes}) => {
  const { setWishlist } = useContext(WishlistContext);
  const removeWish = async () => {
    const updatedWishlist = await putToWishlist(user, card);
    setWishlist(updatedWishlist);
  } 
  return (
    <Button className={classes} onClick={removeWish}>
      <i className="fas fa-times"></i>
    </Button>
  );
}

export default RemoveWish;
