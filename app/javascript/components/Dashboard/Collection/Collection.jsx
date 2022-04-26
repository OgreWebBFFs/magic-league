import React, {useState} from 'react';
import classNames from 'classnames';

import Button from '../../Button';

import {
  CardList,
  CollectionRow,
  TradableToggle
} from '../CardList';
import {
  CardGrid,
  CardImage,
  WishlistToggle
} from '../../CardGrid';
import EmptyState from '../EmptyState';

const Collection = (props) => {
  const isEmpty = props.collectionCards.length < 1;
  const isOwner = props.currentUserId === props.user.id 
  return  (
    <>

      {isEmpty ? <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href={`/collections/${props.user.id}/edit`}>
          Build Your Collection
        </a>
      )} /> : null }
      {props.isListView && !isEmpty ? (
        <CardList> 
          {props.collectionCards.map((card, row) => (
            <CollectionRow>
              <a href={`/cards/${card.id}`}>{card.name}</a>
              <TradableToggle 
                isOwner={isOwner}
                card={card}
                row={row} />
            </CollectionRow>
          ))}
        </CardList>): null }
      {!props.isListView && !isEmpty ? (
        <div className="dashboard__card-grid-wrapper">
          <CardGrid>
            {props.collectionCards.map((card) => (
              <>
                <WishlistToggle userId={props.currentUserId} cardId={card.id} />
                <CardImage {...card} />
              </>
            ))}
          </CardGrid>
        </div>
        ) : null }
    </>
  );
}
export default Collection;
