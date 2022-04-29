import React, {useState, useContext} from 'react';
import WishlistContext from '../../../contexts/WishlistContext';
import {
  CardList,
} from '../CardList';
import {
  CardGrid,
  CardImage,
} from '../../CardGrid';
import EmptyState from '../EmptyState';
import RemoveWish from './RemoveWish';
import { Cell, Row } from '../../Table';

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
            <Row>
              <Cell isPriority={true}>
                <a href={`/cards/${card.id}`}>{card.name}</a>
              </Cell>
              <Cell>
                {isOwner && <RemoveWish
                  user={props.user}
                  card={card}
                  classes={''}/>}
              </Cell>
            </Row>
          ))}
        </CardList>)}
      {(!props.isListView && !isEmpty) && (
        <div className="dashboard__card-grid-wrapper">
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
          </CardGrid>
        </div>)}
    </>
  );
}
export default Wishlist;
