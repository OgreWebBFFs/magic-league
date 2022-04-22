import React, {useState} from 'react';
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
  const [isListView, setIsListView] = useState(true);
  const isEmpty = props.collectionCards.length < 1;
  const isOwner = props.currentUserId === props.user.id 
  return  (
    <>
      <div className="dashboard_card-interface_action-bar">    
        <div className="dashboard_card-interface_view-toggles">
          <div id="collection-table-toggle" className={`dashboard_card-interface_collection_toggle-card-view__btn ${isListView ? 'active' : ''}`} onClick={() => setIsListView(true)}>
            <i className="fas fa-list"></i>
          </div>
          <div id="collection-grid-toggle" className={`dashboard_card-interface_collection_toggle-card-view__btn ${!isListView ? 'active' : ''}`} onClick={() => setIsListView(false)}>
            <i className="fas fa-th-large"></i>
          </div>
        </div>
        {props.edit && (
          <>
            <a className="dashboard_card-interface_action__btn" href={`/collections/${props.user.id}/edit`}>Edit</a>
            <a className="dashboard_card-interface_action__btn" href={`/collections/${props.user.id}/bulk_edit`}>Bulk Edit</a>
          </>
        )}
      </div>
      {isEmpty ? <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href={`/collections/${props.user.id}/edit`}>
          Build Your Collection
        </a>
      )} /> : null }
      {isListView && !isEmpty ? (
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
      {!isListView && !isEmpty ? (
        <CardGrid>
          {props.collectionCards.map((card) => (
            <>
              <WishlistToggle user={props.user} card={card} />
              <CardImage {...card} />
            </>
          ))}
        </CardGrid>) : null }
    </>
  );
}
export default Collection;
