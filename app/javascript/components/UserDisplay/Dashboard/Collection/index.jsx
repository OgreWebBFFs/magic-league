import React from 'react';
import {
  Row,
  Cell,
} from '../../../Table';
import CardList from '../CardList';
import {
  CardGrid,
  CardImageLink,
} from '../../../CardGrid';
import { WishlistToggleSmall } from '../../../WishlistToggle';
import EmptyState from '../EmptyState';
import TradableToggle from './TradableToggle';
import CallToAction from './CallToAction';

const Collection = ({
  collectionCards, currentUserId, user, isListView, viewModifiers,
}) => {
  const isEmpty = collectionCards.length < 1;
  const isOwner = currentUserId === user.id;
  const filteredCollection = collectionCards.filter(
    (card) => viewModifiers.every(
      (filters) => filters.find((filter) => filter(card)),
    ),
  );
  return (
    <>
      {isEmpty && (
      <EmptyState
        isOwner={isOwner}
        user={user}
        CtaComponent={CallToAction}
      />
      )}
      {(isListView && !isEmpty) && (
        <CardList>
          {filteredCollection.map((card, row) => (
            <Row>
              <Cell isPriority>
                <a href={`/cards/${card.id}`}>{card.name}</a>
              </Cell>
              <Cell>
                <TradableToggle
                  isOwner={isOwner}
                  card={card}
                  row={row}
                />
              </Cell>
            </Row>
          ))}
        </CardList>
      )}
      {(!isListView && !isEmpty) && (
        <div className="dashboard__card-grid-wrapper">
          <CardGrid>
            {filteredCollection.map((card, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${card.id}-${i}`}>
                <WishlistToggleSmall
                  userId={user.id}
                  cardId={card.id}
                />
                <CardImageLink card={card} />
              </div>
            ))}
          </CardGrid>
        </div>
      )}
      {filteredCollection.length === 0 && !isEmpty && (
        <p className="dashboard__no-filter-results">
          You&apos;ve filtered too far... turn back now
        </p>
      )}
    </>
  );
};
export default Collection;
