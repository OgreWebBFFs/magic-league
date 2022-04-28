import React, {useState, useContext} from 'react';
import WishlistContext from '../../../contexts/WishlistContext';
import {
  CardList,
  CollectionRow,
} from '../CardList';
import {
  CardGrid,
  CardImage,
} from '../../CardGrid';
import EmptyState from '../EmptyState';
import RemoveWish from './RemoveWish';

const Wishlist = (props) => {
  const {wishlist, currentUserWishlist} = useContext(WishlistContext);
  const isOwner = props.currentUserId === props.user.id;
  const isEmpty = wishlist.length < 1;
  const wishlistToRender = isOwner ? currentUserWishlist : wishlist;
  return  (
    <>
      {isEmpty && <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href="/trades">
          Make some wishes ;)
        </a>
      )}/>}
      {(props.isListView && !isEmpty) && (
        <CardList> 
          {wishlistToRender.map((card, row) => (
            <CollectionRow>
              <a href={`/cards/${card.id}`}>{card.name}</a>
              {isOwner && <RemoveWish
                user={props.user}
                card={card}
                classes={''}
              />}
            </CollectionRow>
          ))}
        </CardList>)}
      {(!props.isListView && !isEmpty) && (
        <CardGrid>
          {wishlistToRender.map((card) => (
            <>
              {isOwner && <RemoveWish
                user={props.user}
                card={card}
                classes={'button button--accent card-grid__wishlist__toggle active'}
              />}
              <CardImage {...card} />
            </>
          ))}
        </CardGrid>)}
    </>
  );
}
export default Wishlist;
