import React, {useState} from 'react';
import {
  CardList,
  CollectionRow,
  TradableToggle
} from '../CardList';
import {
  CardGrid,
  CardImage,
} from '../CardGrid';
import EmptyState from '../EmptyState';
import RemoveWish from './RemoveWish';

const Wishlist = (props) => {
  const [isListView, setIsListView] = useState(true);
  const [wishlist, setWishlist] = useState(props.wishlist);
  const isEmpty = wishlist.length < 1;
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
            <a class="dashboard_card-interface_action__btn" href="/trades">Add</a>
          </>
        )}
      </div>
      {isEmpty ? <EmptyState isOwner={isOwner} user={props.user} CtaComponent={() => (
        <a class="empty-card-view__btn" href="/trades">
          Make some wishes ;)
        </a>
      )}/> : null }
      {isListView && !isEmpty ? (
        <CardList> 
          {wishlist.map((card, row) => (
            <CollectionRow>
              <a href={`/cards/${card.id}`}>{card.name}</a>
              <RemoveWish
                user={props.user}
                card={card}
                wishlist={wishlist}setWishlist={setWishlist}
                classes={'dashboard_card-view_remove-from-wishlist__btn'}
              />
            </CollectionRow>
          ))}
        </CardList>): null }
      {!isListView && !isEmpty ? (
        <CardGrid>
          {wishlist.map((card) => (
            <>
              <RemoveWish
                user={props.user}
                card={card}
                wishlist={wishlist}setWishlist={setWishlist}
                classes={'card-grid__wishlist__toggle active'}
              />
              <CardImage {...card} />
            </>
          ))}
        </CardGrid>) : null }
    </>
  );
}
export default Wishlist;