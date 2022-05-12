import React, {useState, useContext} from 'react';
import WishlistContext from '../../../contexts/WishlistContext';
import {
  CardList,
} from '../CardList';
import {
  CardGrid,
  CardImageLink,
} from '../../CardGrid';
import EmptyState from '../EmptyState';
import RemoveWish from './RemoveWish';
import { Cell, Row } from '../../Table';

const Wishlist = (props) => {
  const {wishlist, currentUserWishlist} = useContext(WishlistContext);
  const isOwner = props.currentUserId === props.user.id;
  const wishlistToRender = isOwner ? currentUserWishlist : wishlist;
  const isEmpty = wishlistToRender.length < 1;
  return  (
    <>
      {isEmpty && <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href="/browse">
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
                <CardImageLink {...card} />
              </>
            ))}
          </CardGrid>
        </div>)}
    </>
  );
}
export default Wishlist;
