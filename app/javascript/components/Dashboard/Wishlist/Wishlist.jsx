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
  const {wishlist} = useContext(WishlistContext);
  const isEmpty = wishlist.length < 1;
  const isOwner = props.currentUserId === props.user.id 
  return  (
    <>
      {isEmpty ? <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href="/trades">
          Make some wishes ;)
        </a>
      )}/> : null }
      {props.isListView && !isEmpty ? (
        <CardList> 
          {wishlist.map((card, row) => (
            <CollectionRow>
              <a href={`/cards/${card.id}`}>{card.name}</a>
              <RemoveWish
                user={props.user}
                card={card}
                classes={'dashboard_card-view_remove-from-wishlist__btn'}
              />
            </CollectionRow>
          ))}
        </CardList>): null }
      {!props.isListView && !isEmpty ? (
       <div className="dashboard__card-grid-wrapper">
          <CardGrid>
            {wishlist.map((card) => (
              <>
                <RemoveWish
                  user={props.user}
                  card={card}
                  classes={'card-grid__wishlist__toggle active'}
                />
                <CardImage {...card} />
              </>
            ))}
          </CardGrid>
        </div>) : null }
    </>
  );
}
export default Wishlist;
