import xhrRequest from '../../helpers/xhr-request';

const putToWishlist = async (userId, cardId) => xhrRequest({
  url: `/wishlists/${userId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({ card_id: cardId }),
  },
});

export default putToWishlist;
